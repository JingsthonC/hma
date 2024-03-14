import { useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";

export async function loader({ params }) {
  try {
    const response = await apiService.getBillingSummaryById(
      params.billingSummaryId,
    );
    const billing_summary = response.data;
    console.log(billing_summary);
    return billing_summary; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const BillingSummary = () => {
  const billing_summary = useLoaderData();
  return (
    <div className=" rounded border p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Billing Summary</h2>

      <div className="mb-4">
        <label className="block text-gray-600">Billing Summary Number:</label>
        <span className="text-gray-800">
          {billing_summary.billing_summary_number}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">
          Billing Summary Create Date:
        </label>
        <span className="text-gray-800">
          {billing_summary.billing_summary_create_date}
        </span>
      </div>

      {/* <div className="mb-4">
        <label className="block text-gray-600">
          Billing Summary Billed Transactions:
        </label>
        <ul className="ml-4 list-disc">
          {billing_summary.billing_summary_billed_transactions.map(
            (transaction, index) => (
              <li key={index}>{transaction}</li>
            ),
          )}
        </ul>
      </div> */}

      {/* Add other billing information fields similarly */}

      {/* <div className="mt-4">
        <label className="block text-gray-600">Billing Status:</label>
        <span className="text-green-600">{billing_summary.billing_status}</span>
    </div>*/}
    </div>
  );
};

export default BillingSummary;
