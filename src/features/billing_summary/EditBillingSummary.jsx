import { useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";
import { useState } from "react";
import DatePicker from "../../ui/DatePicker";
import TextInput from "../../ui/TextInput";

export async function loader({ params }) {
  try {
    const response = await apiService.getBillingSummaryById(
      params.billingSummaryId,
    );
    const billing_summary = response.data;
    // const billingDate = billing_summary.billing_summary_create_date;
    // Extract the billed transactions array
    const billed_transactions =
      billing_summary.billing_summary_billed_transactions;

    const withBillingTransRes =
      await apiService.getTransactionsByNumbers(billed_transactions);
    const transactions = withBillingTransRes.data;
    return { transactions, billing_summary }; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// export async function action(transactionNumber, formData) {
//   try {
//     const newTransaction = await apiService.updateTransaction(
//       transactionNumber,
//       formData,
//     );
//     return { newTransaction };
//     // return redirect("/transactions");
//   } catch (error) {
//     console.error("Error adding transaction:", error);
//   }
// }

export default function EditBillingSummary() {
  const { transactions, billing_summary } = useLoaderData();
  console.log("billing summary", billing_summary);

  const initialData = {
    billing_status: billing_summary.billing_status,
    billing_submitted_date: billing_summary.billing_submitted_date,
    billing_summary_billed_transactions:
      billing_summary.billing_summary_billed_transactions,
    billing_summary_check_number: billing_summary.billing_summary_check_number,
    billing_summary_create_date: billing_summary.billing_summary_create_date,
    billing_summary_gross_amount: billing_summary.billing_summary_gross_amount,
    billing_summary_net_amount: billing_summary.billing_summary_net_amount,
    billing_summary_net_payables: billing_summary.billing_summary_net_payables,
    billing_summary_number: billing_summary.billing_summary_number,
    billing_summary_value_added_tax:
      billing_summary.billing_summary_value_added_tax,
    billing_summary_withholding_tax:
      billing_summary.billing_summary_withholding_tax,
    email: billing_summary.email,
  };
  const [transactionsData, setTransactionsData] = useState(transactions);
  const [formData, setFormData] = useState(initialData);
  const [billSumCreateDate, setBillSumCreateDate] = useState(
    billing_summary.billing_summary_create_date,
  );
  const [billSumSubmitDate, setBillSumSubmitDate] = useState(
    billing_summary.billing_submitted_date,
  );

  const handleDeleteAll = () => {
    // Implement logic to delete all transactions
    setTransactionsData([]);
  };

  const handleDeleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const updatedTransactions = [...transactions];
      updatedTransactions.splice(index, 1);
      setTransactionsData(updatedTransactions);
    }
  };

  const handleBillSumCreateDateChange = (date) => {
    setBillSumCreateDate(() => date);
    setFormData((prevData) => ({
      ...prevData,
      billing_summary_create_date: date,
    }));
  };

  const handleBillSumSubmitDateChange = (date) => {
    setBillSumSubmitDate(() => date);
    setFormData((prevData) => ({
      ...prevData,
      billing_submitted_date: date,
    }));
  };

  const handleChangeBillSumCheckNumber = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      billing_summary_check_number: value,
    }));
  };

  console.log("form data", formData);
  return (
    <div className="flex flex-col justify-items-stretch gap-5">
      <div className="bg-gray col-span-3 flex h-auto flex-col justify-between gap-2 border-2 border-solid p-2 md:flex-row">
        <h1 className=" mb-4 w-full text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          {billing_summary.billing_summary_number}
        </h1>
        <h1 className=" mb-4 w-full text-right text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          {billing_summary.account_name}
        </h1>
      </div>
      <div className="flex justify-start  gap-5 px-5">
        <DatePicker
          label="Create Date"
          onChange={handleBillSumCreateDateChange}
          loadedDate={billSumCreateDate}
        />
        <TextInput
          label="Check Number"
          id="billing_summary_check_number"
          placeholder="Check Number"
          value={formData.billing_summary_check_number}
          onChange={handleChangeBillSumCheckNumber}
          darkMode={false}
        />
        <DatePicker
          label="Submit Date"
          onChange={handleBillSumSubmitDateChange}
          loadedDate={billSumSubmitDate}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <button onClick={handleDeleteAll}>❌All</button>
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div>Transaction Date</div>
                <div>Delivery Date</div>
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Plate Number
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Truck Type
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Shipment Number
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Trip Ticket Number
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sales Invoice Date
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sales Invoice Number
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Delivery Receipt Number
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Number of Cases
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Destination
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Charge Amount
              </th>
              <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {transactionsData.map((transaction, index) => (
              <tr
                key={transaction.transaction_number}
                className="hover:bg-gray-100"
              >
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  <button onClick={() => handleDeleteRow(index)}>❌</button>
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_date}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.truck_plate}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.truck_type_name}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_shipment_number}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_trip_ticket_number}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_sales_invoice_date}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_sales_invoice_number}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_delivery_receipt_number}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_number_of_cases}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.customer_name}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.destination_name}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_charge_amount}
                </td>
                <td className="whitespace-nowrap border border-gray-200 px-6 py-4">
                  {transaction.transaction_remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="self-end">
        <table className="border-collapse border border-gray-400">
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                NET AMOUNT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                P {billing_summary.billing_summary_net_amount}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                ADD 12% VAT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {billing_summary.billing_summary_value_added_tax}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                GROSS AMOUNT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {billing_summary.billing_summary_gross_amount}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                LESS 2% WT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {billing_summary.billing_summary_withholding_tax}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                NET PAYABLES P
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {billing_summary.billing_summary_net_payables}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
