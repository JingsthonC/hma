import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [categoriesRes] = await Promise.all([apiService.getAllCategories()]);

    return {
      categories: categoriesRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Categories() {
  const { categories } = useLoaderData();

  const separatedData = categories.reduce((acc, entry) => {
    const { account_name } = entry;
    return {
      ...acc,
      [account_name]: [...(acc[account_name] || []), entry],
    };
  }, {});

  // Render separated data
  return (
    <>
      <div className="flex w-full justify-between p-5">
        <h2 className="text-4xl font-extrabold dark:text-white">Categories</h2>
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
        <div>
          {Object.entries(separatedData).map(([account, accountData]) => (
            <div key={account} className="gap-4 p-4">
              <h2 className="mb-4 text-xl font-bold">{account}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {accountData.map((entry) => (
                  <Link key={entry.category_id} to={`${entry.category_id}`}>
                    <div
                      className={`rounded-lg p-6 shadow-md ${entry.category_status === "active" ? "bg-green-200" : "bg-red-200"}`}
                      key={entry.category_id}
                    >
                      <h3 className="mb-2 text-lg font-semibold">
                        {entry.category_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Category ID: {entry.category_id}
                      </p>
                      <p className="text-sm text-gray-600">
                        Base Rate: {entry.category_base_rate}
                      </p>
                      <p className="text-sm text-gray-600">
                        Status: {entry.category_status}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
