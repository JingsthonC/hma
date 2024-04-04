import { useLoaderData, Link } from "react-router-dom";
import apiService from "../../services/apiService";

export async function loader({ params }) {
  try {
    const response = await apiService.getSupplierBillingById(
      params.supplierBillingId,
    );
    const supplier_billing = response.data;
    // const billingDate = supplier_billing.supplier_billing_create_date;
    // Extract the billed transactions array
    const billed_transactions =
      supplier_billing.supplier_billing_included_transactions;

    const withBillingTransRes =
      await apiService.getTransactionsByNumbers(billed_transactions);
    const transactions = withBillingTransRes.data;
    return { transactions, supplier_billing }; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function SupplierBilling() {
  const { transactions, supplier_billing } = useLoaderData();
  console.log(supplier_billing);
  return (
    <div className="flex flex-col justify-items-stretch">
      <div className="flex justify-between px-5">
        <h2 className="mb-4 text-2xl font-semibold">
          {supplier_billing.supplier_billing_date}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.transaction_number}
                className="hover:bg-gray-100"
              >
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
                BILLING AMOUNT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                P {supplier_billing.supplier_billing_amount}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                DEDUCT AMOUNT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {supplier_billing.supplier_billing_deduct_amount}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                PAYABLE AMOUNT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {supplier_billing.supplier_billing_net}
              </td>
            </tr>
            {/* <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                LESS 2% WT
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {supplier_billing.supplier_billing_withholding_tax}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-left">
                NET PAYABLES P
              </td>
              <td className="border border-gray-400 px-4 py-2 text-right">
                {supplier_billing.supplier_billing_net_payables}
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
