import { useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";

export async function loader({ params }) {
  try {
    const response = await apiService.getTransactionById(params.transactionId);
    const transaction = response.data;
    return transaction; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Transaction() {
  const transaction = useLoaderData();
  return (
    <div className="outer-container mx-auto my-8 flex w-full max-w-md flex-wrap  rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Transaction Details</h2>
      <form className="flex flex-wrap">
        {Object.keys(transaction).map((property) => (
          <div key={property} className="mb-4 w-full sm:w-1/2 sm:pr-2">
            <label className="block text-gray-600">
              {property.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              // readOnly
              className="w-full rounded-md border border-gray-300 p-2"
              value={
                Array.isArray(transaction[property])
                  ? transaction[property].join(", ")
                  : transaction[property]
              }
            />
          </div>
        ))}
      </form>
    </div>
  );
}
