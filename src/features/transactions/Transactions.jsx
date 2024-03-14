import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const response = await apiService.getAllTransactions();
    const data = response.data;
    const transactions = data.map((item) => ({ ...item, key: item.id }));
    return transactions; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Transactions() {
  const transactions = useLoaderData();

  return (
    <div>
      {transactions.length && <TransactionList transactions={transactions} />}
    </div>
  );
}

function TransactionList({ transactions }) {
  return (
    <div className="">
      <div className="flex justify-between px-5">
        <h2 className="mb-4 text-2xl font-semibold">Transaction Data List</h2>{" "}
        <Link to={`edit`}>
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            type="submit"
          >
            New
          </button>
        </Link>
      </div>
      <ul className="list-inside list-disc rounded-md border border-gray-300 bg-white p-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="hover:underline">
            <Link to={`${transaction.id}`}>
              {`ID: ${transaction.id}, Date: ${transaction.transaction_date}, Account Name: ${transaction.account_name}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
