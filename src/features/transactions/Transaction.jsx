import { useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";

export async function loader({ params }) {
  try {
    const response = await apiService.getTransactionById(
      params.transactionNumber,
    );
    const transaction = response.data;
    return transaction; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Transaction() {
  const transaction = useLoaderData();

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-md bg-white p-8 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Transaction Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-gray-600">
            Transaction Number:
          </label>
          <p>{transaction.transaction_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Transaction Date:
          </label>
          <p>{transaction.transaction_date}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Account Name:</label>
          <p>{transaction.account_name}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Truck Plate:</label>
          <p>{transaction.truck_plate}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Truck Type:</label>
          <p>{transaction.truck_type_name}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Shipment Number:
          </label>
          <p>{transaction.transaction_shipment_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Trip Ticket Number:
          </label>
          <p>{transaction.transaction_trip_ticket_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Sales Invoice Date:
          </label>
          <p>{transaction.transaction_sales_invoice_date}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Sales Invoice Number:
          </label>
          <p>{transaction.transaction_sales_invoice_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Sales Invoice Quantity:
          </label>
          <p>{transaction.transaction_sales_invoice_qty}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Delivery Receipt Number:
          </label>
          <p>{transaction.transaction_delivery_receipt_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Number of Cases:
          </label>
          <p>{transaction.transaction_number_of_cases}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Customer Name:</label>
          <p>{transaction.customer_name}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Destination Name:
          </label>
          <p>{transaction.destination_name}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Charge Amount:</label>
          <p>{transaction.transaction_charge_amount}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Subcon Payable Amount:
          </label>
          <p>{transaction.transaction_subcon_payable_amount}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Truck Rate:</label>
          <p>{transaction.transaction_truck_rate}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Status:</label>
          <p>{transaction.transaction_status}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Supplier Billing Number:
          </label>
          <p>{transaction.supplier_billing_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Supplier Billing Check Number:
          </label>
          <p>{transaction.supplier_billing_check_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Billing Summary Number:
          </label>
          <p>{transaction.billing_summary_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">
            Billing Summary Check Number:
          </label>
          <p>{transaction.billing_summary_check_number}</p>
        </div>
        <div>
          <label className="font-semibold text-gray-600">Email:</label>
          <p>{transaction.email}</p>
        </div>
        <div className="col-span-2">
          <label className="font-semibold text-gray-600">Remarks:</label>
          <p>{transaction.transaction_remarks}</p>
        </div>
      </div>
    </div>
  );
}
