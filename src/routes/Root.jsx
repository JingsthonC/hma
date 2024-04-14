// import PropTypes from "prop-types";

import "../App.css";
// import { useEffect } from "react";
// import PropTypes from "prop-types";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import Sidebar from "../ui/Sidebar";
import UserProfile from "../features/users/UserProfile";
import logo from "/logo.png";

// function Root() {
//   const { user } = useAuth;

//   return (
//     <div className="App md:flex md:h-screen md:flex-col">
//       <div className="flex flex-row flex-wrap justify-between bg-gradient-to-r from-white via-gray-500 to-red-500 px-5">
//         <div className="md:60 h-24 w-full rounded sm:w-60 lg:w-60">
//           <Link to={"dashboard"}>
//             <img src={logo} alt="Logo" className="h-24 w-full" />
//           </Link>
//         </div>
//         <div className="my-2 flex  items-center justify-between ">
//           <div className="relative flex items-center">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full rounded border p-2 pl-8"
//             />
//             <div className="absolute inset-y-0 left-0 flex items-center pl-2">
//               <span role="img" aria-label="Search Icon">
//                 🔍
//               </span>
//             </div>
//           </div>
//           <UserProfile user={user} />
//         </div>
//       </div>
//       <div className="flex h-full flex-grow flex-wrap border-solid">
//         <div className="basis-full border-2 border-solid border-white sm:basis-1/5 md:basis-1/5 xl:basis-1/5">
//           <Sidebar />
//         </div>
//         <div className="border-2 border-solid border-white  bg-cover bg-center bg-no-repeat sm:basis-4/5 md:basis-4/5 xl:basis-4/5">
//           <Outlet />
//         </div>
//       </div>
//       {/* <div className="sticky flex flex-row flex-wrap justify-around bg-gradient-to-r from-white via-gray-500 to-red-500">
//         <Footer />
//         <HelpSupport />
//       </div> */}
//       <div className="sticky mt-auto flex flex-row flex-wrap justify-around bg-gradient-to-r from-white via-gray-500 to-red-500">
//         <Footer />
//         <HelpSupport />
//       </div>
//     </div>
//   );
// }

// export default Root;

//version 2

function Root() {
  // const { staff } = useAuth(); // Call the useAuth hook to get the context value
  // console.log("user in useAuth", staff);
  const staffInfo = JSON.parse(localStorage.getItem("staff"));
  // console.log("user in useAuth", staffInfo.email);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex-none">
        <div className="flex flex-row flex-wrap justify-center bg-gradient-to-r from-white via-gray-500 to-red-500 px-5 md:justify-between">
          <div className="md:60 h-24 w-full rounded sm:w-60 lg:w-60">
            <Link to={"dashboard"}>
              <img src={logo} alt="Logo" className="h-24 w-full" />
            </Link>
          </div>
          <div className="my-2 flex items-center justify-between ">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded border p-2 pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <span role="img" aria-label="Search Icon">
                  🔍
                </span>
              </div>
            </div>
            <UserProfile user={staffInfo} />
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="flex h-full flex-col border-solid md:flex-row">
          <div className="basis-full border-2 border-solid border-white md:basis-1/5 lg:basis-1/5">
            <Sidebar />
          </div>
          <div className="w-full overflow-x-auto">
            <div className="border-2 border-solid border-white  bg-cover bg-center bg-no-repeat sm:basis-4/5 md:basis-4/5 lg:basis-4/5">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <footer className="sticky mt-auto flex-none">
        <div className="flex flex-row flex-wrap justify-around bg-gradient-to-r from-white via-gray-500 to-red-500">
          <Footer />
          <HelpSupport />
        </div>
      </footer>
    </div>
  );
}

export default Root;

const Footer = () => {
  return (
    <footer className=" p-4 text-white">
      <p>&copy; 2024 HMA. All rights reserved.</p>
      {/* Additional footer content */}
    </footer>
  );
};
const HelpSupport = () => {
  return (
    <div className="help-support  p-4 text-white">
      <p>Need help? Contact us:</p>
      <a href="mailto:support@example.com">support@example.com</a>
      {/* Additional help and support content */}
    </div>
  );
};

const Notification = () => {
  return (
    <div className="notification bg-yellow-400 p-4 text-black">
      <p>Real-time alerts or notifications...</p>
      {/* Additional notification content */}
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar bg-white p-4">
      <input
        type="text"
        placeholder="Search..."
        className="rounded border p-2"
      />
      {/* Additional search bar content */}
    </div>
  );
};

const FiltersControls = () => {
  return (
    <div className="filters-controls bg-gray-200 p-4">
      <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
        Filter Data
      </button>
      <select className="rounded border p-2">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      {/* Additional filters and controls content */}
    </div>
  );
};

const AnalyticsMetrics = () => {
  return (
    <div className="analytics-metrics bg-gray-300 p-4">
      <h2 className="text-2xl font-bold">Key Metrics</h2>
      {/* Visualizations and metrics */}
      {/* ... */}
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="action-buttons bg-gray-200 p-4">
      <button className="mr-2 rounded bg-green-500 px-4 py-2 text-white">
        Create
      </button>
      <button className="mr-2 rounded bg-yellow-500 px-4 py-2 text-white">
        Edit
      </button>
      <button className="rounded bg-red-500 px-4 py-2 text-white">
        Delete
      </button>
      {/* Additional action buttons content */}
    </div>
  );
};

function Loader() {
  return <p className="">Loading ...</p>;
}
