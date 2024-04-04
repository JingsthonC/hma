import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { Form, Link, useLoaderData } from "react-router-dom";
import TransactionTable from "../transactions/TransactionTable";
import DatePicker from "../../ui/DatePicker";
import TextInput from "../../ui/TextInput";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialData = {
  supplier_billing_date: "",
  supplier_billing_included_transactions: [],
  supplier_billing_check_number: "",
  supplier_billing_status: "not_completed",
  user_email: storedUser.email && storedUser.email,
};

export async function loader() {
  try {
    const dashRes = await apiService.getSupplierBillingDashboardData();
    const dashData = dashRes.data;
    return dashData; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function action(formData) {
  try {
    const newSupplierBilling = await apiService.addSupplierBilling(formData);
    return { newSupplierBilling };
  } catch (error) {
    console.error("Error adding supplier billing:", error);
  }
}

export default function SupplierBillings() {
  const dashData = useLoaderData();
  const [currentData, setCurrentData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [transTableData, setTransTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [queryParams, setQueryParams] = useState({});
  const [checkedTransactions, setCheckedTransactions] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [showCheckBox, setShowCheckBox] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setCurrentData("supplierBilling");
      try {
        const response =
          await apiService.getFilteredSupplierBilling(queryParams);
        const data = response.data;
        const filteredSupplierBillings = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setTableData(filteredSupplierBillings);
      } catch (error) {
        console.error("Error filtering supplier billings:", error);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      supplier_billing_included_transactions: checkedTransactions,
    }));

    if (Object.keys(queryParams).length > 0) {
      fetchData();
    }
  }, [queryParams, checkedTransactions]);
  // console.log("Checked transactions: ", checkedTransactions);

  const handleCheckboxChange = (transactionNumber) => {
    setCheckedTransactions((prev) => [...prev, transactionNumber]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
    try {
      const result = await action(formData);
      return result.newSupplierBilling;
      // console.log("New Billing Summary:", result.newBillingSummary);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleClick = () => {
    setShowCheckBox(true);
    setShowTable(true);
    setCurrentData("transactions");
    async function fetchData() {
      try {
        const response = await apiService.getFilteredTransactions({
          transaction_status: "with_billing_summary",
        });
        const data = response.data;
        const filteredTransactions = data.map((item) => ({
          ...item,
          key: item.id,
        }));
        setTransTableData(filteredTransactions);
      } catch (error) {
        console.error("Error filtering transactions:", error);
      }
    }
    fetchData();
  };

  async function handleTotalClick() {
    try {
      const response = await apiService.getAllSupplierBillings();
      const data = response.data;
      const supplierBillings = data.map((item) => ({ ...item, key: item.id }));

      if (supplierBillings.length > 0) {
        setCurrentData("billingSummary");
        setTableData(() => supplierBillings);
        setShowTable(true);
      }
      return supplierBillings; // Returning billingSummaries inside try block
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleCompletedClick() {
    setShowTable(true);
    setQueryParams({ supplier_billing_status: "completed" });
  }

  function handleNotCompletedClick() {
    setShowTable(true);
    setQueryParams({ supplier_billing_status: "not_completed" });
  }

  const handleCreateDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      supplier_billing_date: date,
    }));
  };

  const handleBillingCheckNumber = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      supplier_billing_check_number: value,
    }));
  };

  return (
    <>
      <div className="flex flex-col justify-start gap-5 p-5 md:flex-row">
        {dashData ? (
          <>
            <DashboardCard
              onClick={handleTotalClick}
              title="Total Billing Summaries"
              value={dashData.total_supplier_billings}
            />
            <DashboardCard
              onClick={handleCompletedClick}
              title="Completed Supplier Billings"
              value={dashData.completed_count}
            />
            <DashboardCard
              onClick={handleNotCompletedClick}
              title="Not Completed Supplier Billings"
              value={dashData.not_completed_count}
            />
            <Button text="Create Supplier Billing" onClick={handleClick} />
          </>
        ) : (
          <div className="col-span-4 flex items-center justify-center text-xl font-bold text-gray-500">
            No data available
          </div>
        )}
      </div>
      <div className="mx-auto h-auto w-auto border border-gray-900">
        {showTable && (
          <div className="overflow-scroll ">
            {currentData !== "transactions" ? (
              <BillingSummaryList supplierBillings={tableData} />
            ) : (
              <TransactionTable
                transactions={transTableData}
                setDataLoaded={setCheckedTransactions} // Use setCheckedTransactions instead of setDataLoaded
                handleCheckboxChange={handleCheckboxChange}
                checkedTransactions={checkedTransactions}
                checkBoxstate={showCheckBox}
              />
            )}
          </div>
        )}
        {checkedTransactions.length > 0 && (
          <div className="mx-auto flex flex-col  justify-between gap-5 p-5 md:flex-row">
            <DatePicker label="Create Date" onChange={handleCreateDateChange} />
            <TextInput
              label="Supplier Billing Check Number"
              id="supplier_billing_check_number"
              placeholder="Check Number"
              value={formData.supplier_billing_check_number}
              onChange={handleBillingCheckNumber}
              darkMode={false}
            />
            <Form onSubmit={handleSubmit} c>
              <button
                type="submit"
                className="group relative mb-2 me-2 inline-flex items-center justify-center self-end overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
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
            >
              Cancel
            </button>
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

function BillingSummaryList({ supplierBillings }) {
  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-semibold">Billing Summary List</h2>
      <ul className="list-inside list-disc rounded-md border border-gray-300 bg-white p-4">
        {supplierBillings.map((supplier_billing) => (
          <li
            key={supplier_billing.supplier_billing_invoice_number}
            className="hover:underline"
          >
            <Link to={`${supplier_billing.supplier_billing_invoice_number}`}>
              {`Number: ${supplier_billing.supplier_billing_invoice_number}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
