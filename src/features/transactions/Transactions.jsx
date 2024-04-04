import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";
import SelectorComponent from "../../ui/SelectorComponent";
import { useState, useEffect } from "react";
import SelectorComponentIndexBase from "../../ui/SelectorComponentIndexBase";
import TransactionTable from "./TransactionTable";
import {
  extractUniqueProperties,
  extractUniqueID,
} from "../../services/extractorService";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  try {
    const [
      transactionsRes,
      accountsRes,
      trucksRes,
      customerRes,
      destinationsRes,
      truckTypesRes,
    ] = await Promise.all([
      apiService.getAllTransactions(),
      apiService.getAllAccounts(),
      apiService.getAllTrucks(),
      apiService.getAllCustomers(),
      apiService.getAllDestinations(),
      apiService.getAllTruckTypes(),
    ]);

    return {
      transactions: transactionsRes.data,
      accounts: accountsRes.data,
      trucks: trucksRes.data,
      customers: customerRes.data,
      destinations: destinationsRes.data,
      truckTypes: truckTypesRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

export default function Transactions() {
  const {
    transactions,
    accounts,
    trucks,
    customers,
    destinations,
    truckTypes,
  } = useLoaderData();

  const [dataLoaded, setDataLoaded] = useState(transactions);
  const [loadedFilterData, setLoadedFilterData] = useState([]);
  const [level2Query, setLevel2Query] = useState("All");
  const [selectedAccount, setSelectedAccount] = useState("Choose an account");
  const [selectedKey, setSelectedKey] = useState("");
  const [queryParams, setQueryParams] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(
    "Select Filter Category",
  );
  const [filterData, setFilterData] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const [showTable, setShowTable] = useState(false);
  const filterOptions = [
    { id: 1, title: "Transaction Date" },
    { id: 2, title: "Customer Name" },
    { id: 3, title: "Destination Name" },
    { id: 4, title: "Plate Number" },
    { id: 5, title: "Truck Type" },
    { id: 6, title: "Status" },
  ];

  // Run this effect whenever queryParams change

  const handleAccountChange = (selectedValue) => {
    // setSelectedPlateNumber("Select Plate Number"); // Reset selectedPlateNumber
    setSelectedFilter(() => "Select Filter Category");
    setSelectedAccount(selectedValue);
    setFilterCategory(() => "");
    setLevel2Query(() => "All");

    async function fetchData() {
      try {
        // Reset queryParams inside the async function
        setQueryParams({});

        const updatedQueryParams = { account_id: selectedValue };
        const response =
          await apiService.getFilteredTransactions(updatedQueryParams);
        const data = response.data;

        const filteredTransactions = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        // Initialize each transaction with checked: false
        const transactionsChecker = filteredTransactions.map((transaction) => ({
          ...transaction,
          checked: false,
        }));

        // console.log("transactions", transactionsChecker);
        setDataLoaded(filteredTransactions);
        setLoadedFilterData(filteredTransactions);
        setQueryParams(updatedQueryParams); // Update the queryParams state after setting the data

        // const plateNumbersSet = new Set();
        // filteredTransactions.slice().forEach((item) => {
        //   plateNumbersSet.add(item.truck_plate);
        // });

        // const uniquePlateNumbers = Array.from(plateNumbersSet).map(
        //   (plateNumber, index) => ({
        //     id: index, // Assign unique ID if needed
        //     value: plateNumber,
        //     label: plateNumber,
        //   }),
        // );

        // const truckIds = uniquePlateNumbers.map(({ value }) => ({
        //   plateNumber: value,
        //   truckId:
        //     trucks.find((truck) => truck.truck_plate === value)?.id ?? null,
        // }));

        // setLoadedPlates(truckIds);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }
    fetchData();
    setShowTable(true);
  };

  // //extract unique properties
  // function extractUniqueProperties(filteredTransactions, propertyName) {
  //   const propertyValuesSet = new Set();
  //   filteredTransactions.slice().forEach((item) => {
  //     propertyValuesSet.add(item[propertyName]);
  //   });

  //   const uniqueProperties = Array.from(propertyValuesSet).map(
  //     (value, index) => ({
  //       id: index, // You can assign a unique ID if needed
  //       value: value,
  //       label: value,
  //     }),
  //   );
  //   return uniqueProperties;
  // }

  // function extractUniqueID(value, propertyName, referenceArray) {
  //   const propertyId =
  //     referenceArray.find((obj) => obj[propertyName] === value)?.id ?? null;
  //   return propertyId;
  // }

  // Function to handle filter category change
  const handleFilterChange = (selectedValue) => {
    setQueryParams({ account_id: selectedAccount });
    setSelectedFilter(selectedValue);
    // Based on the selected category, set the options
    switch (selectedValue) {
      case "Transaction Date":
        setFilterCategory("Transaction Date");
        setSelectedKey("transaction_date");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "transaction_date"),
        );
        break;
      case "Customer Name":
        setFilterCategory("Customer Name");
        setSelectedKey("customer_id");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "customer_name"),
        );
        break;
      case "Destination Name":
        setFilterCategory("Destination Name");
        setSelectedKey("destination_id");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "destination_name"),
        );
        break;
      case "Plate Number":
        setFilterCategory("Plate Number");
        setSelectedKey("truck_id");
        setLevel2Query(() => "All");
        setFilterData(extractUniqueProperties(loadedFilterData, "truck_plate"));
        break;
      case "Truck Type":
        setFilterCategory("Truck Type");
        setSelectedKey("truck_type_id");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "truck_type_name"),
        );
        break;
      case "Status":
        setFilterCategory("Status");
        setSelectedKey("transaction_status");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "transaction_status"),
        );
        break;
      // Add more cases for other filter categories
      default:
        setFilterCategory("");
    }
  };

  const handleSelectFilter = (selectedValue) => {
    setLevel2Query(selectedValue);
    switch (selectedKey) {
      case "transaction_date":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          transaction_date: selectedValue,
        }));
        break;
      case "transaction_status":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          transaction_status: selectedValue,
        }));
        break;
      case "customer_id":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          customer_id: extractUniqueID(
            selectedValue,
            "customer_name",
            customers,
          ),
        }));
        break;
      case "destination_id":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          destination_id: extractUniqueID(
            selectedValue,
            "destination_name",
            destinations,
          ),
        }));
        break;
      case "truck_id":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          truck_id: extractUniqueID(selectedValue, "truck_plate", trucks),
        }));
        break;
      case "truck_type_id":
        setQueryParams((prevQuery) => ({
          ...prevQuery,
          truck_type_id: extractUniqueID(
            selectedValue,
            "truck_type_name",
            truckTypes,
          ),
        }));
        break;
      default:
        setFilterCategory("");
    }
  };

  return (
    <div>
      <Link to={`add`}>
        <button
          className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          type="submit"
        >
          New
        </button>
      </Link>
      {transactions.length ? (
        <>
          <div className="flex flex-row gap-5">
            <SelectorComponent
              label="Choose an account"
              options={accounts.map((account) => ({
                id: account.id,
                value: account.id,
                label: account.account_name,
              }))}
              selectedValue={selectedAccount}
              onChange={handleAccountChange}
            />
            {selectedAccount !== "Choose an account" && (
              <>
                <SelectorComponent
                  label="Select Filter Category"
                  options={filterOptions.map((option) => ({
                    id: option.id,
                    value: option.title,
                    label: option.title,
                  }))}
                  selectedValue={selectedFilter}
                  onChange={handleFilterChange}
                />
                {selectedFilter !== "Select Filter Category" && (
                  <SelectorComponentIndexBase
                    label={`Select ${filterCategory}`}
                    initialOption={"All"}
                    options={filterData.map((data, index) => ({
                      key: index, // Ensure each option has a unique key
                      id: data.id, // Assign truckId as id
                      value: data.value, // Assign plateNumber as value
                      label: data.value, // Assign plateNumber as label
                    }))}
                    selectedValue={level2Query}
                    onChange={handleSelectFilter}
                  />
                )}
              </>
            )}
          </div>
          {showTable && (
            <TransactionTable
              transactions={dataLoaded}
              setDataLoaded={setDataLoaded}
            />
          )}
        </>
      ) : (
        <p>No transactions yet</p>
      )}
    </div>
  );
}

// function TransactionTable({ transactions, setDataLoaded }) {
//   const handleCheckboxChange = (index) => {
//     const newTransactions = [...transactions];
//     newTransactions[index].checked = !newTransactions[index].checked;
//     setDataLoaded(newTransactions);
//     console.log("New transactions", newTransactions);
//   };

//   const handleSelectAllChange = () => {
//     const allChecked = transactions.every((transaction) => transaction.checked);
//     const newTransactions = transactions.map((transaction) => ({
//       ...transaction,
//       checked: !allChecked,
//     }));
//     setDataLoaded(newTransactions);
//     console.log("New transactions", newTransactions);
//   };
//   return (
//     <div className="">
//       <div className="flex justify-between px-5">
//         <h2 className="mb-4 text-2xl font-semibold">Transaction Data List</h2>{" "}
//       </div>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th>
//               <input
//                 id="header-checkbox"
//                 type="checkbox"
//                 onChange={handleSelectAllChange}
//                 className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
//               />
//               <label
//                 htmlFor="header-checkbox"
//                 className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Select All
//               </label>
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Transaction Number
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Date
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Customer Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Destination Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Plate Number
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Truck Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Shipment Number
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Trip Ticket Number
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 bg-white">
//           {transactions.map((transaction, index) => (
//             <tr
//               key={transaction.transaction_number}
//               className="hover:bg-gray-100"
//             >
//               <td className="content-center">
//                 {/* Add flex and alignment classes */}
//                 <div className="flex items-center">
//                   {/* Add flex and alignment classes */}
//                   <input
//                     type="checkbox"
//                     checked={transaction.checked || false}
//                     onChange={() => handleCheckboxChange(index)}
//                     className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
//                   />
//                 </div>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 <Link
//                   to={`${transaction.transaction_number}`}
//                   className="text-blue-500 hover:underline"
//                 >
//                   {transaction.transaction_number}
//                 </Link>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.transaction_date}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.customer_name}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.destination_name}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.truck_plate}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.truck_type_name}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.transaction_shipment_number}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.transaction_trip_ticket_number}
//               </td>
//               <td className="whitespace-nowrap px-6 py-4">
//                 {transaction.transaction_status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
