import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

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

export default function Accounts() {
  const { accounts } = useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between p-5">
        <h2 className="text-4xl font-extrabold dark:text-white">Accounts</h2>
        <Link to={`add`}>
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            type="submit"
          >
            New
          </button>
        </Link>
      </div>
      <div className="flex h-full flex-wrap gap-5 overflow-y-auto py-4">
        {accounts.map((account) => (
          <Link key={account.account_id} to={`${account.account_id}`}>
            <AccountCard account={account} />
          </Link>
        ))}
      </div>
    </div>
  );
}

const AccountCard = ({ account }) => {
  return (
    <div className="mx-4 w-64 flex-none overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-gray-800">
          {account.account_name}
        </div>
        <p className="mb-2 text-base text-gray-700">
          <span className="font-semibold">ID:</span> {account.account_id}
        </p>
        <p className="mb-2 text-base text-gray-700">
          <span className="font-semibold">Phone:</span> {account.account_phone}
        </p>
        <p className="mb-2 text-base text-gray-700">
          <span className="font-semibold">Email:</span> {account.account_email}
        </p>
        <p className="text-base text-gray-700">
          <span className="font-semibold">Fuel Price:</span> $
          {account.account_fuel_price}
        </p>
        <p className="text-base text-gray-700">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={
              account.account_status === "active"
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {account.account_status}
          </span>
        </p>
      </div>
    </div>
  );
};
