import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const response = await apiService.getAllBillingSummaries();
    const data = response.data;
    const billingSummaries = data.map((item) => ({ ...item, key: item.id }));
    console.log(billingSummaries);
    return billingSummaries; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function BillingSummaries() {
  const billingSummaries = useLoaderData();

  return (
    <div>
      {billingSummaries.length && (
        <BillingSummaryList billingSummaries={billingSummaries} />
      )}
    </div>
  );
}

function BillingSummaryList({ billingSummaries }) {
  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-semibold">Billing Summary List</h2>
      <ul className="list-inside list-disc rounded-md border border-gray-300 bg-white p-4">
        {billingSummaries.map((billing_summary) => (
          <li key={billing_summary.id} className="hover:underline">
            <Link to={`${billing_summary.id}`}>
              {`Number: ${billing_summary.billing_summary_number}, Create Date: ${billing_summary.billing_summary_create_date}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
