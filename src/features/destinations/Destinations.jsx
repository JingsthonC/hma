import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [accountsRes, categoriesRes, destinationsRes] = await Promise.all([
      apiService.getAllAccounts(),
      apiService.getAllCategories(),
      apiService.getAllDestinations(),
    ]);

    return {
      accounts: accountsRes?.data || [],
      categories: categoriesRes?.data || [],
      destinations: destinationsRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Destinations() {
  const { accounts, categories, destinations } = useLoaderData();
  console.log("destinations", destinations);
  console.log("categories", categories);
  console.log("accounts", accounts);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = categories.filter(
    (category) =>
      selectedAccount && category.account_name === selectedAccount.account_name,
  );

  const filteredDestinations = destinations.filter(
    (destination) =>
      selectedCategory &&
      destination.category_id === selectedCategory.category_id,
  );

  return (
    <div>
      <div className="flex w-full justify-between p-5">
        <h2 className="text-4xl font-extrabold dark:text-white">
          Destinations
        </h2>
        <Link to={`add`}>
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            type="submit"
          >
            New
          </button>
        </Link>
      </div>
      <AccountTabs
        accounts={accounts}
        setSelectedAccount={setSelectedAccount}
        selectedAccount={selectedAccount}
      />
      <CategoryTabs
        categories={filteredCategories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {selectedCategory && filteredDestinations.length === 0 ? (
        <p>No destinations available.</p>
      ) : (
        <DestinationCards destinations={filteredDestinations} />
      )}
    </div>
  );
}

function AccountTabs({ accounts, setSelectedAccount, selectedAccount }) {
  return (
    <ul className="rounded-lg text-center text-sm font-medium text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      {accounts.map((account) => (
        <li key={account.account_id} className="w-full focus-within:z-10">
          <button
            className={`inline-block w-full rounded-l-lg border-r border-gray-200 bg-white p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
              selectedAccount?.account_id === account.account_id
                ? "bg-gray-400 text-white"
                : ""
            }`}
            onClick={() => setSelectedAccount(account)}
          >
            {account.account_name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function CategoryTabs({ categories, setSelectedCategory, selectedCategory }) {
  return (
    <ul className="rounded-lg text-center text-sm font-medium text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      {categories.map((category) => (
        <li key={category.category_id} className="w-full focus-within:z-10">
          <button
            className={`inline-block w-full rounded-l-lg border-r border-gray-200 bg-white p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
              selectedCategory?.category_id === category.category_id
                ? "bg-gray-400 text-white" // Apply different style for active tab
                : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.category_name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function DestinationCard({ destination }) {
  return (
    <Link key={destination.destination_id} to={`${destination.destination_id}`}>
      <div className="m-4 flex rounded-lg bg-white p-4 shadow-md">
        <div className="mr-4 flex-1">
          <h3 className="mb-1 text-lg font-semibold">
            {destination.destination_name}
          </h3>
          <p className="text-sm text-gray-600">
            Category Name: {destination.category_name}
          </p>
          <p className="text-sm text-gray-600">
            Distance: {destination.destination_distance} km
          </p>
          <p className="text-sm text-gray-600">
            Status: {destination.destination_status}
          </p>
        </div>
      </div>
    </Link>
  );
}

function DestinationCards({ destinations }) {
  if (destinations.length === 0) {
    return null;
  }

  return (
    <div>
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.destination_id}
          destination={destination}
        />
      ))}
    </div>
  );
}

// import { useState } from "react";
// import apiService from "../../services/apiService";
// import { Link, useLoaderData } from "react-router-dom";

// export async function loader() {
//   try {
//     const [accountsRes, categoriesRes, destinationsRes] = await Promise.all([
//       apiService.getAllAccounts(),
//       apiService.getAllCategories(),
//       apiService.getAllDestinations(),
//     ]);

//     return {
//       accounts: accountsRes?.data || [],
//       categories: categoriesRes?.data || [],
//       destinations: destinationsRes?.data || [],
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// export default function Destinations() {
//   const { accounts, categories, destinations } = useLoaderData();
//   console.log("destinations", destinations);
//   console.log("categories", categories);
//   console.log("accounts", accounts);
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const filteredCategories = categories.filter(
//     (category) =>
//       selectedAccount && category.account_name === selectedAccount.account_name,
//   );

//   const filteredDestinations = destinations.filter(
//     (destination) =>
//       selectedCategory &&
//       destination.category_id === selectedCategory.category_id,
//   );

//   return (
//     <div>
//       <AccountTabs
//         accounts={accounts}
//         setSelectedAccount={setSelectedAccount}
//       />
//       <CategoryTabs
//         categories={filteredCategories}
//         setSelectedCategory={setSelectedCategory}
//       />
//       <DestinationCards destinations={filteredDestinations} />
//     </div>
//   );
// }

// function AccountTabs({ accounts, setSelectedAccount }) {
//   return (
//     <ul className="rounded-lg text-center text-sm font-medium text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
//       {accounts.map((account) => (
//         <li key={account.account_id} className="w-full focus-within:z-10">
//           <button
//             className={`inline-block w-full rounded-l-lg border-r border-gray-200 bg-white p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
//             onClick={() => setSelectedAccount(account)}
//           >
//             {account.account_name}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function CategoryTabs({ categories, setSelectedCategory }) {
//   return (
//     <ul className="rounded-lg text-center text-sm font-medium text-gray-500 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
//       {categories.map((category) => (
//         <li key={category.category_id} className="w-full focus-within:z-10">
//           <button
//             className={`inline-block w-full rounded-l-lg border-r border-gray-200 bg-white p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category.category_name}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function DestinationCard({ destination }) {
//   return (
//     <div className="m-4 flex rounded-lg bg-white p-4 shadow-md">
//       <div className="mr-4 flex-1">
//         <h3 className="mb-1 text-lg font-semibold">
//           {destination.destination_name}
//         </h3>
//         <p className="text-sm text-gray-600">
//           Category Name: {destination.category_name}
//         </p>
//         <p className="text-sm text-gray-600">
//           Distance: {destination.destination_distance} km
//         </p>
//         <p className="text-sm text-gray-600">
//           Status: {destination.destination_status}
//         </p>
//       </div>
//     </div>
//   );
// }

// function DestinationCards({ destinations }) {
//   return (
//     <div>
//       {destinations.map((destination) => (
//         <DestinationCard
//           key={destination.destination_id}
//           destination={destination}
//         />
//       ))}
//     </div>
//   );
// }
