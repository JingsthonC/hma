import apiService from "../../services/apiService";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import SelectorComponent from "../../ui/SelectorComponent";
import { useState, useEffect } from "react";
import SelectorComponentIndexBase from "../../ui/SelectorComponentIndexBase";
import { data } from "autoprefixer";

// export async function loader() {
//   try {
//     const response = await apiService.getAllTransactions();
//     const data = response.data;
//     const transactions = data.map((item) => ({ ...item, key: item.id }));

//     const accountsRes = await apiService.getAllAccounts();
//     const accountsData = accountsRes.data;
//     const accounts = accountsData.map((item) => ({ ...item, key: item.id }));

//     const trucksRes = await apiService.getAllTrucks();
//     const trucksData = trucksRes.data;
//     const trucks = trucksData.map((item) => ({ ...item, key: item.id }));

//     return {
//       accounts: accounts,
//       transactions: transactions,
//       trucks: trucks,
//       // truckTypes: truckTypes,
//       // customers: customers,
//       // destinations: destinations,
//     }; // Update the state with the fetched data
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

export async function loader() {
  try {
    const [
      transactionsRes,
      accountsRes,
      trucksRes,
      customerRes,
      destinationsRes,
    ] = await Promise.all([
      apiService.getAllTransactions(),
      apiService.getAllAccounts(),
      apiService.getAllTrucks(),
      apiService.getAllCustomers(),
      apiService.getAllDestinations(),
    ]);

    return {
      transactions: transactionsRes.data,
      accounts: accountsRes.data,
      trucks: trucksRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

export default function Transactions() {
  const { transactions, accounts, trucks } = useLoaderData();

  // const initialQuery = {};

  const [dataLoaded, setDataLoaded] = useState(transactions);
  const [loadedPlates, setLoadedPlates] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("Choose an account");
  const [selectedPlateNumber, setSelectedPlateNumber] = useState(
    "Select Plate Number",
  );
  const [queryParams, setQueryParams] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(
    "Select Filter Category",
  );
  const [filterData, setFilterData] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const filterOptions = [
    { id: 1, title: "Transaction Date" },
    { id: 2, title: "Customer Name" },
    { id: 3, title: "Destination Name" },
    { id: 4, title: "Plate Number" },
    { id: 5, title: "Truck Type" },
    { id: 6, title: "Status" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiService.getFilteredTransactions(queryParams);
        const data = response.data;
        const filteredTransactions = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setDataLoaded(filteredTransactions);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }

    // Fetch data only if queryParams change
    if (Object.keys(queryParams).length !== 0) {
      fetchData();
    }
  }, [queryParams]); // Run this effect whenever queryParams change

  // Extract unique plate numbers from dataLoaded

  // const plateNumbersSet = new Set();
  // dataLoaded.slice().forEach((item) => {
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
  //   truckId: trucks.find((truck) => truck.truck_plate === value)?.id ?? null, // Find truck ID based on truck_plate
  // }));
  // useEffect(() => {
  //   setQueryParams({});
  // }, [selectedAccount]);

  // useEffect(() => {
  //   const plateNumbersSet = new Set();
  //   dataLoaded.slice().forEach((item) => {
  //     plateNumbersSet.add(item.truck_plate);
  //   });

  //   const uniquePlateNumbers = Array.from(plateNumbersSet).map(
  //     (plateNumber, index) => ({
  //       id: index, // Assign unique ID if needed
  //       value: plateNumber,
  //       label: plateNumber,
  //     }),
  //   );

  //   const truckIds = uniquePlateNumbers.map(({ value }) => ({
  //     plateNumber: value,
  //     truckId: trucks.find((truck) => truck.truck_plate === value)?.id ?? null,
  //   }));

  //   setLoadedPlates(truckIds);
  //   // Do something with uniquePlateNumbers and truckIds here, if needed
  // }, [dataLoaded, trucks]);

  // const handleAccountChange = (selectedValue) => {
  //   setSelectedPlateNumber("Select Plate Number"); // Reset selectedPlateNumber
  //   setQueryParams({});
  //   setSelectedAccount(selectedValue);

  //   // Use the selectedValue directly instead of accessing it from state
  //   const updatedQueryParams = { ...queryParams, account_id: selectedValue };
  //   // console.log("query params", { account_id: selectedValue });
  //   async function fetchData() {
  //     try {
  //       const response =
  //         await apiService.getFilteredTransactions(updatedQueryParams);
  //       const data = response.data;
  //       const filteredTransactions = data.map((item) => ({
  //         ...item,
  //         key: item.id,
  //       }));
  //       setDataLoaded(filteredTransactions);
  //       setQueryParams(updatedQueryParams); // Update the queryParams state after setting the data
  //     } catch (error) {
  //       console.error("Error filtering transactions:", error);
  //     }
  //   }
  //   fetchData();
  // };

  const handleAccountChange = (selectedValue) => {
    setSelectedPlateNumber("Select Plate Number"); // Reset selectedPlateNumber
    setSelectedAccount(selectedValue);

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
        setDataLoaded(filteredTransactions);
        setQueryParams(updatedQueryParams); // Update the queryParams state after setting the data

        const plateNumbersSet = new Set();
        filteredTransactions.slice().forEach((item) => {
          plateNumbersSet.add(item.truck_plate);
        });

        const uniquePlateNumbers = Array.from(plateNumbersSet).map(
          (plateNumber, index) => ({
            id: index, // Assign unique ID if needed
            value: plateNumber,
            label: plateNumber,
          }),
        );

        const truckIds = uniquePlateNumbers.map(({ value }) => ({
          plateNumber: value,
          truckId:
            trucks.find((truck) => truck.truck_plate === value)?.id ?? null,
        }));

        setLoadedPlates(truckIds);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }
    fetchData();
  };

  //extract unique properties
  function extractUniqueProperties(filteredTransactions, propertyName) {
    const propertyValuesSet = new Set();
    filteredTransactions.slice().forEach((item) => {
      propertyValuesSet.add(item[propertyName]);
    });

    const uniqueProperties = Array.from(propertyValuesSet).map(
      (value, index) => ({
        id: index, // You can assign a unique ID if needed
        value: value,
        label: value,
      }),
    );

    return uniqueProperties;
  }
  //dynamic filter data
  const processFilterData = (filterCategory) => {
    console.log("filter category", filterCategory);
    async function fetchData() {
      try {
        // Reset queryParams inside the async function
        // setQueryParams({});

        // const updatedQueryParams = { account_id: selectedValue };
        const response =
          await apiService.getFilteredTransactions(updatedQueryParams);
        const data = response.data;
        const filteredTransactions = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setDataLoaded(filteredTransactions);
        setQueryParams(updatedQueryParams); // Update the queryParams state after setting the data

        const plateNumbersSet = new Set();
        filteredTransactions.slice().forEach((item) => {
          plateNumbersSet.add(item.truck_plate);
        });

        const uniquePlateNumbers = Array.from(plateNumbersSet).map(
          (plateNumber, index) => ({
            id: index, // Assign unique ID if needed
            value: plateNumber,
            label: plateNumber,
          }),
        );

        const truckIds = uniquePlateNumbers.map(({ value }) => ({
          plateNumber: value,
          truckId:
            trucks.find((truck) => truck.truck_plate === value)?.id ?? null,
        }));

        setFilterData(truckIds);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }
    fetchData();
  };

  const handlePlateChange = (selectedValue) => {
    setSelectedPlateNumber(selectedValue);
    setQueryParams((prevQuery) => ({
      ...prevQuery,
      truck_id: selectedValue,
    }));
  };

  // Function to handle filter category change
  const handleFilterChange = (selectedValue) => {
    setSelectedFilter(selectedValue);
    processFilterData(selectedValue);
    console.log(selectedValue);
    // Based on the selected category, set the options
    switch (selectedValue) {
      case "Transaction Date":
        setFilterCategory("Transaction Date");

        setQueryParams((prevQuery) => ({
          ...prevQuery,
          transaction_date: selectedValue,
        }));
        break;
      case "Customer Name":
        setFilterCategory("Customer Name");
        break;
      case "Destination Name":
        setFilterCategory("Destination Name");
        break;
      case "Plate Number":
        setFilterCategory("Plate Number");
        break;
      case "Truck Type":
        setFilterCategory("Truck Type");
        break;
      case "Status":
        setFilterCategory("Status");
        break;
      // Add more cases for other filter categories
      default:
        setFilterCategory("");
    }
  };

  console.log("data loaded", dataLoaded);
  console.log("query params", queryParams);
  console.log("loadedPlates", loadedPlates);

  return (
    <div>
      <Link to={`edit`}>
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
                    options={loadedPlates.map((truck, index) => ({
                      key: index, // Ensure each option has a unique key
                      id: truck.truckId, // Assign truckId as id
                      value: truck.truckId, // Assign plateNumber as value
                      label: truck.plateNumber, // Assign plateNumber as label
                    }))}
                    selectedValue={selectedPlateNumber}
                    onChange={handlePlateChange}
                  />
                )}
              </>
            )}
          </div>
          <TransactionTable transactions={dataLoaded} />
        </>
      ) : (
        <p>No transactions yet</p>
      )}
    </div>
  );
}

function TransactionTable({ transactions }) {
  return (
    <div className="">
      <div className="flex justify-between px-5">
        <h2 className="mb-4 text-2xl font-semibold">Transaction Data List</h2>{" "}
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Transaction Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Destination Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Plate Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Truck Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Shipment Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Trip Ticket Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((transaction) => (
            <tr
              key={transaction.transaction_number}
              className="hover:bg-gray-100"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  to={`${transaction.transaction_number}`}
                  className="text-blue-500 hover:underline"
                >
                  {transaction.transaction_number}
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_date}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.customer_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.destination_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.truck_plate}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.truck_type_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_shipment_number}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_trip_ticket_number}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
