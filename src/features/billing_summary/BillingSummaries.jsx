import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import TransactionTable from "../transactions/TransactionTable";
import DatePicker from "../../ui/DatePicker";
import TextInput from "../../ui/TextInput";
import SelectorComponent from "../../ui/SelectorComponent";
import SelectorComponentIndexBase from "../../ui/SelectorComponentIndexBase";
import {
  extractUniqueProperties,
  extractUniqueID,
} from "../../services/extractorService";
const storedUser = JSON.parse(localStorage.getItem("user"));

export async function loader() {
  try {
    const [accountsRes] = await Promise.all([apiService.getAllAccounts()]);

    return {
      accounts: accountsRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function action(formData) {
  try {
    const newBillingSummary = await apiService.addBillingSummary(formData);
    return { newBillingSummary };
  } catch (error) {
    console.error("Error adding billing summaries:", error);
  }
}

export default function BillingSummaries() {
  const initialData = {
    billing_summary_create_date: "", // Replace with the actual date and time
    billing_summary_billed_transactions: [],
    billing_submitted_date: "", // Replace with the actual date and time
    billing_status: "not_completed",
    billing_summary_check_number: "",
    account_id: "",
    user_email: storedUser.email && storedUser.email,
  };

  const filterOptions = [
    { id: 1, title: "Transaction Date" },
    { id: 2, title: "Customer Name" },
    { id: 3, title: "Destination Name" },
    { id: 4, title: "Plate Number" },
    { id: 5, title: "Truck Type" },
    // { id: 6, title: "Status" },
  ];
  const navigate = useNavigate();
  // const { accounts } = useLoaderData();
  const {
    // transactions,
    accounts,
    // trucks,
    // customers,
    // destinations,
    // truckTypes,
  } = useLoaderData();

  const [dashboardData, setDashboardData] = useState({});
  const [currentData, setCurrentData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [transTableData, setTransTableData] = useState([]);
  const [selectedTransTableData, setSelectedTransTableData] = useState([]);
  const [unselectedTransTable, setUnselectedTransTable] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [checkedTransactions, setCheckedTransactions] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [showCheckBox, setShowCheckBox] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("Choose an account");
  const [dataLoaded, setDataLoaded] = useState({});
  const [loadedFilterData, setLoadedFilterData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(
    "Select Filter Category",
  );
  const [filterData, setFilterData] = useState({});
  const [level2Query, setLevel2Query] = useState("All");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [queryParams, setQueryParams] = useState({});
  // const [transQueryParams, setTransQueryParams] = useState({});
  const [originalTransData, setOriginalTransData] = useState([]);
  const [filterFromOrigData, setFilterFromOrigData] = useState({});

  const filters = {
    // transaction_date: "2024-03-28",
    customer_name: "Bronze Works",
    // destination_name: "Bocaue Bulacan 2",
  };

  useEffect(() => {
    async function fetchData() {
      setCurrentData("billingSummary");
      try {
        const response =
          await apiService.getFilteredBillingSummary(queryParams);
        const data = response.data;
        const filteredBillingSummaries = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setTableData(filteredBillingSummaries);
      } catch (error) {
        console.error("Error filtering billing summaries:", error);
      }
    }

    if (Object.keys(queryParams).length > 0) {
      fetchData();
    }
  }, [queryParams]);

  useEffect(() => {
    const { selectedTransactions, unselectedTransactions } =
      separateTransactions(originalTransData);
    setSelectedTransTableData(selectedTransactions);
    setUnselectedTransTable(unselectedTransactions);
  }, [originalTransData]);

  // Update initialData when selectedTransTable changes
  useEffect(() => {
    const selectedTransactionNumbers = selectedTransTableData.map(
      (transaction) => transaction.transaction_number,
    );
    setFormData((prevInitialData) => ({
      ...prevInitialData,
      billing_summary_billed_transactions: selectedTransactionNumbers,
    }));
  }, [selectedTransTableData]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response =
  //         await apiService.getFilteredTransactions(transQueryParams);
  //       const data = response.data;
  //       const filteredTransactions = data.map((item) => ({
  //         ...item,
  //         key: item.id,
  //       }));
  //       setTransTableData(filteredTransactions);
  //     } catch (error) {
  //       console.error("Error filtering transactions:", error);
  //     }
  //   }

  //   // Fetch data only if queryParams change
  //   if (Object.keys(transQueryParams).length !== 0) {
  //     fetchData();
  //   }
  // }, [transQueryParams]);

  const handleAccountChange = (selectedValue) => {
    setTableData(() => []);
    setTransTableData(() => []);
    setSelectedAccount(selectedValue);
    setShowTable(false);
    setFormData((prevInitialData) => ({
      ...prevInitialData,
      account_id: selectedValue,
    }));

    async function fetchData() {
      try {
        setQueryParams({});

        const updatedQueryParams = { account_id: selectedValue };
        const dashRes =
          await apiService.getBillingSummaryDashboardData(updatedQueryParams);
        const dashData = dashRes.data;

        const transactionResponse = await apiService.getFilteredTransactions({
          account_id: selectedValue,
          transaction_status: "not_yet_processed",
        });
        const transData = transactionResponse.data;

        const filteredTransactions = transData.map((item) => ({
          ...item,
          key: item.id,
        }));

        const unSelectedTransctions = filteredTransactions.map(
          (transaction) => ({ ...transaction, selected: false }),
        );

        setOriginalTransData(unSelectedTransctions);

        const billingSummaryResponse =
          await apiService.getFilteredBillingSummary(updatedQueryParams);

        const billSumData = billingSummaryResponse.data;

        const filteredBillSumData = billSumData.map((item) => ({
          ...item,
          key: item.id,
        }));

        setTableData(filteredBillSumData);
        // setTransTableData(filteredTransactions);
        setLoadedFilterData(filteredTransactions);
        setQueryParams(updatedQueryParams); // Update the queryParams state after setting the data
        setDashboardData(dashData);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }
    fetchData();
    // setShowTable(true);
  };

  const handleCheckboxChange = (transactionNumber) => {
    setOriginalTransData((prevTransTableData) => {
      return prevTransTableData.map((transaction) => {
        if (transaction.transaction_number === transactionNumber) {
          // Toggle the selected property
          return {
            ...transaction,
            selected: !transaction.selected,
          };
        }
        return transaction;
      });
    });
  };

  // Function to separate transactions based on the selected property

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
    try {
      const result = await action(formData);
      navigate("/billing-summary");
      console.log("New Billing Summary:", result.newBillingSummary);
      return result.newBillingSummary;

      // Handle success
    } catch (error) {
      console.error("error message", error.message);
    }
    // try {
    //   const newBillingSummary = await apiService.addBillingSummary(formData);
    //   return { newBillingSummary };
    // } catch (error) {
    //   console.error("Error adding billing summaries:", error);
    // }
  };

  function filterTransactions(transactions, filters) {
    return transactions.filter((transaction) => {
      for (const key in filters) {
        if (filters[key] !== undefined && transaction[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  }

  const separateTransactions = (transactions) => {
    const selectedTransactions = transactions.filter(
      (transaction) => transaction.selected,
    );
    const unselectedTransactions = transactions.filter(
      (transaction) => !transaction.selected,
    );
    return { selectedTransactions, unselectedTransactions };
  };

  // const { selectedTransactions, unselectedTransactions } =
  //   separateTransactions(originalTransData);

  const handleClick = () => {
    setShowCheckBox(true);
    setShowTable(true);
    setCurrentData("transactions");
  };

  async function handleTotalClick() {
    try {
      const response = await apiService.getAllBillingSummaries();
      const data = response.data;
      const billingSummaries = data.map((item) => ({ ...item, key: item.id }));

      if (billingSummaries.length > 0) {
        setCurrentData("billingSummary");
        setTableData(() => billingSummaries);
        setShowTable(true);
      }
      return billingSummaries; // Returning billingSummaries inside try block
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleCompletedClick() {
    setShowTable(true);
    setQueryParams({ billing_status: "completed" });
    setCurrentData(() => "billingSummary");
  }

  function handleNotCompletedClick() {
    setShowTable(true);
    setQueryParams({ billing_status: "not_completed" });
  }

  const handleCreateDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      billing_summary_create_date: date,
    }));
  };

  const handleSubmitDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      billing_submitted_date: date,
    }));
  };

  const handleBillingCheckNumber = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      billing_summary_check_number: value,
    }));
  };

  const handleFilterChange = (selectedValue) => {
    // setQueryParams({ account_id: selectedAccount });
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
        setUnselectedTransTable(originalTransData);
        break;
      case "Customer Name":
        setFilterCategory("Customer Name");
        setSelectedKey("customer_name");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "customer_name"),
        );
        setUnselectedTransTable(originalTransData);
        break;
      case "Destination Name":
        setFilterCategory("Destination Name");
        setSelectedKey("destination_name");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "destination_name"),
        );
        setUnselectedTransTable(originalTransData);
        break;
      case "Plate Number":
        setFilterCategory("Plate Number");
        setSelectedKey("truck_plate");
        setLevel2Query(() => "All");
        setFilterData(extractUniqueProperties(loadedFilterData, "truck_plate"));
        setUnselectedTransTable(originalTransData);
        break;
      case "Truck Type":
        setFilterCategory("Truck Type");
        setSelectedKey("truck_type_name");
        setLevel2Query(() => "All");
        setFilterData(
          extractUniqueProperties(loadedFilterData, "truck_type_name"),
        );
        setUnselectedTransTable(originalTransData);
        break;
      // case "Status":
      //   setFilterCategory("Status");
      //   setSelectedKey("transaction_status");
      //   setLevel2Query(() => "All");
      //   setFilterData(
      //     extractUniqueProperties(loadedFilterData, "transaction_status"),
      //   );
      //   break;
      // Add more cases for other filter categories
      default:
        setUnselectedTransTable(originalTransData);
    }
  };

  const handleSelectFilter = (selectedValue) => {
    setLevel2Query(selectedValue);
    console.log("level2Query", level2Query);
    switch (selectedKey) {
      case "transaction_date":
        setUnselectedTransTable(
          filterTransactions(originalTransData, {
            transaction_date: selectedValue,
          }),
        );
        break;
      case "customer_name":
        setUnselectedTransTable(
          filterTransactions(originalTransData, {
            customer_name: selectedValue,
          }),
        );
        break;
      case "destination_name":
        setUnselectedTransTable(
          filterTransactions(originalTransData, {
            destination_name: selectedValue,
          }),
        );
        break;
      case "truck_plate":
        setUnselectedTransTable(
          filterTransactions(originalTransData, {
            truck_plate: selectedValue,
          }),
        );
        break;
      case "truck_type_name":
        setUnselectedTransTable(
          filterTransactions(originalTransData, {
            truck_type_name: selectedValue,
          }),
        );
        break;
      default:
        setUnselectedTransTable(originalTransData);
    }
  };

  return (
    <>
      <div className="w-full gap-5 py-5">
        <SelectorComponent
          label="Choose an account"
          options={accounts.map((account) => ({
            id: account.account_id,
            value: account.account_id,
            label: account.account_name,
          }))}
          selectedValue={selectedAccount}
          onChange={handleAccountChange}
        />
      </div>
      {selectedAccount !== "Choose an account" && (
        <div className="flex w-full flex-col">
          {tableData.length > 0 ? (
            <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
              <div className="flex w-full flex-col gap-5 border border-gray-900 p-5">
                <h1 className="self-center text-2xl">Billing Summary </h1>
                <div>
                  <div className="flex flex-col justify-around p-5 md:flex-row">
                    <DashboardCard
                      onClick={handleTotalClick}
                      title="Total Billing Summaries"
                      value={dashboardData.total_billing_summaries}
                    />
                    {dashboardData.completed_count === 0 && (
                      <DashboardCard
                        onClick={handleCompletedClick}
                        title="Completed Billings"
                        value={dashboardData.completed_count}
                      />
                    )}

                    <DashboardCard
                      onClick={handleNotCompletedClick}
                      title="Not Completed Billings"
                      value={dashboardData.not_completed_count}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-4 flex items-center justify-center py-5 text-xl font-bold text-gray-500">
              No data available
            </div>
          )}

          <Button text="Create Billing" onClick={handleClick} />
        </div>
      )}

      <div className="mx-auto h-auto w-auto border border-gray-900">
        {showTable && (
          <div className="overflow-scroll ">
            {currentData !== "transactions" ? (
              <BillingSummaryList billingSummaries={tableData} />
            ) : (
              <>
                <div className="flex flex-col justify-center justify-items-stretch rounded-lg border-4 border-double border-indigo-600 md:container md:mx-auto">
                  <div className="w-full text-center">
                    <h1 className="text-xl">CREATE BILLING SUMMARY FORM</h1>
                  </div>
                  <div className="w-fit">
                    <div className="flex flex-col gap-5 md:flex-row">
                      <DatePicker
                        label="Create Date"
                        onChange={handleCreateDateChange}
                      />
                      <DatePicker
                        label="Submit Date"
                        onChange={handleSubmitDateChange}
                      />
                      <TextInput
                        label="Billing Summary Check Number"
                        id="billing_summary_check_number"
                        placeholder="Check Number"
                        value={formData.billing_summary_check_number}
                        onChange={handleBillingCheckNumber}
                        darkMode={false}
                      />
                    </div>
                  </div>
                  <div className="container ">
                    <h1 className="text-lg">Transactions</h1>
                    <div className="flex flex-col border-2 border-solid border-green-500 md:flex-row">
                      {unselectedTransTable.length > 0 && (
                        <>
                          <div>
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
                          </div>
                          {selectedFilter !== "Select Filter Category" && (
                            <div>
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
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-x-2 md:flex-row">
                    <div className="w-1/2 border-2 border-solid border-red-500">
                      <div className="flex flex-col justify-between px-5 md:flex-row">
                        <h1>Transactions</h1>
                        <h2>{unselectedTransTable.length}</h2>
                      </div>

                      <div className="w-auto">
                        {unselectedTransTable.map((transaction) => (
                          <TransactionCard
                            key={transaction.transaction_number}
                            transaction={transaction}
                            onCheckboxChange={handleCheckboxChange}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-1/2 border-2 border-solid border-green-500">
                      <div className="flex flex-col justify-between px-5 md:flex-row">
                        <h1>Selected Transactions</h1>
                        <h2>{selectedTransTableData.length}</h2>
                      </div>
                      <div className="w-full">
                        {selectedTransTableData.map((transaction) => (
                          <TransactionCard
                            key={transaction.transaction_number}
                            transaction={transaction}
                            onCheckboxChange={handleCheckboxChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="h-auto w-full border-2 border-solid border-gray-400"> */}
                  {selectedTransTableData.length > 0 && (
                    <div className="mx-auto flex flex-col  justify-between gap-5 p-5 md:flex-row">
                      <Form onSubmit={handleSubmit}>
                        <button
                          type="submit"
                          className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
                        >
                          <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                            Save
                          </span>
                        </button>
                      </Form>
                      <button
                        type="button"
                        onClick={() => {
                          setShowTable(false);
                          setCheckedTransactions([]);
                        }}
                        className="group relative mb-2 me-2 inline-flex items-center justify-center self-end overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
                      >
                        <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                          Cancel
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const DashboardCard = ({ title, value, onClick }) => {
  return (
    <div
      className="cursor-pointer rounded-lg bg-white p-6 shadow-lg hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <div className="mt-2 text-4xl font-bold text-indigo-600">{value}</div>
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
    >
      {text}
    </button>
  );
};

function BillingSummaryList({ billingSummaries }) {
  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-semibold">Billing Summary List</h2>
      <ul className="list-inside list-disc rounded-md border border-gray-300 bg-white p-4">
        {billingSummaries.map((billing_summary) => (
          <li
            key={billing_summary.billing_summary_number}
            className="hover:underline"
          >
            <Link to={`${billing_summary.billing_summary_number}`}>
              {`Number: ${billing_summary.billing_summary_number}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TransactionCard({ transaction, onCheckboxChange }) {
  const handleCheckboxChange = () => {
    onCheckboxChange(transaction.transaction_number);
  };
  return (
    <div className="my-5 flex h-auto w-auto shrink grow flex-row gap-1 rounded-lg border-2 border-solid border-indigo-600 md:justify-items-center">
      <div className="flex shrink items-stretch self-center border border-solid ">
        <input
          type="checkbox"
          checked={transaction.selected}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
      </div>
      <div className=" flex shrink items-stretch self-center text-xs ">
        <Link
          to={`/transactions/${transaction.transaction_number}/edit`}
          className="text-blue-500 hover:underline"
        >
          <p className="text-xs">{transaction.transaction_number}</p>
        </Link>
      </div>
      <div className="flex shrink flex-col justify-center  md:flex-row ">
        <div className="grid justify-items-center">
          <div className="w-32 shrink grow border border-solid">
            <p className="text-center text-xs">
              {transaction.transaction_date}
            </p>
          </div>
          <div className="w-32 shrink grow border border-solid">
            <p className="text-center text-xs">
              {transaction.transaction_shipment_number}
            </p>
          </div>
        </div>
        <div className="grid shrink justify-items-center ">
          <div className="w-24 shrink grow border border-solid">
            <p className="text-center text-xs">{transaction.truck_plate}</p>
          </div>
          <div className="w-24 shrink grow  border border-solid">
            <p className="text-center text-xs">{transaction.truck_type_name}</p>
          </div>
        </div>
        <div className="grid shrink justify-items-center ">
          <div className="w-40 shrink grow border border-solid">
            <p className="text-center text-xs">{transaction.customer_name}</p>
          </div>
          <div className="w-40 shrink grow border border-solid">
            <p className="text-center text-xs">
              {transaction.destination_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
