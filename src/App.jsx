import Root from "./routes/Root";
import "./App.css";
import Login from "./Login";

function App() {
  return <Login />;
}

export default App;

// import { useReducer } from "react";

// // Reducer function
// const counterReducer = (state, action) => {
//   console.log(`state: ${state.count}, action: ${action.type}`);
//   switch (action.type) {
//     case "INCREMENT":
//       return { count: state.count + 1 };
//     case "DECREMENT":
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// };

// const App = () => {
//   // useReducer returns the current state and a dispatch function
//   const [state, dispatch] = useReducer(counterReducer, { count: 0 });

//   return (
//     <div>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
//       <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
//     </div>
//   );
// };

// export default App;

// import PropTypes from "prop-types";

// function App() {
//   return (
//     <div className="App md:flex md:h-screen md:flex-col">
//       <div className="flex flex-row flex-wrap justify-between bg-gradient-to-r from-white via-gray-500 to-red-500 px-5">
//         <div className="md:60 h-24 w-full rounded sm:w-60 lg:w-60">
//           <img src="logo.png" alt="Logo" className="h-24 w-full" />
//         </div>
//         <div className="my-2 flex items-center justify-between ">
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
//           <UserProfile />
//         </div>
//       </div>
//       <div className="flex h-full border-solid">
//         <div className="basis-full border-2 border-solid border-white md:basis-1/5 xl:basis-1/5">
//           <Sidebar />
//         </div>
//         <div className="basis-full border-2 border-solid border-white  bg-cover bg-center bg-no-repeat md:basis-4/5 xl:basis-4/5">
//           <MainContent />
//         </div>
//       </div>
//       <div className="flex flex-row flex-wrap justify-around bg-gradient-to-r from-white via-gray-500 to-red-500">
//         <Footer />
//         <HelpSupport />
//       </div>
//     </div>
//   );
// }

// export default App;

// const Header = () => {
//   return (
//     <header className="flex flex-col items-center justify-between bg-gradient-to-r from-white via-gray-500 to-red-500 p-4 lg:flex-row">
//       {/* Logo on the left */}
//       <div className="flex items-center lg:order-1">
//         <img
//           src="logo.png"
//           alt="Logo"
//           className="max-h-20 w-full lg:w-3/12 xl:w-4/12"
//         />
//       </div>

//       {/* User profile and search bar on the right */}
//       <div className="sm:items- mt-4 sm:flex-row-reverse lg:order-2 lg:mt-0 lg:flex lg:items-center">
//         <div className="relative lg:ml-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full rounded border p-2 pl-8"
//           />
//           <div className="absolute inset-y-0 left-0 flex items-center pl-2">
//             <span>🔍</span>
//           </div>
//         </div>
//         <UserProfile className="lg:ml-4" />
//       </div>
//     </header>
//   );
// };

// const Sidebar = () => {
//   return (
//     <aside className="bg-gray-500 p-4 text-white">
//       <nav>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Dashboard
//         </a>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Transactions
//         </a>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Billing Summary
//         </a>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Accounts
//         </a>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Subcon
//         </a>
//         <a href="#" className="block py-2 hover:bg-gray-700">
//           Trucks
//         </a>
//       </nav>
//       {/* Additional sidebar content */}
//     </aside>
//   );
// };

// const MainContent = () => {
//   return (
//     <main className="size-full overscroll-auto bg-gray-500 p-4">
//       <h2 className="mb-4 text-2xl font-bold">Main Content</h2>
//       {/* Data visualizations, charts, etc. */}
//       {/* ... */}
//       <Dashboard />
//     </main>
//   );
// };

// function Dashboard() {
//   return (
//     <div className="flex size-auto flex-wrap justify-center gap-10">
//       <div className="size-48 rounded-xl bg-indigo-500">1</div>
//       <div className="size-48 rounded-xl bg-indigo-500">2</div>
//       <div className="size-48 rounded-xl bg-indigo-500">3</div>
//       <div className="size-48 rounded-xl bg-indigo-500">4</div>
//       <div className="size-48 rounded-xl bg-indigo-500">5</div>
//       <div className="size-48 rounded-xl bg-indigo-500">6</div>
//     </div>
//   );
// }

// App.propTypes = {};

// const Footer = () => {
//   return (
//     <footer className=" p-4 text-white">
//       <p>&copy; 2024 HMA. All rights reserved.</p>
//       {/* Additional footer content */}
//     </footer>
//   );
// };

// const Notification = () => {
//   return (
//     <div className="notification bg-yellow-400 p-4 text-black">
//       <p>Real-time alerts or notifications...</p>
//       {/* Additional notification content */}
//     </div>
//   );
// };

// const SearchBar = () => {
//   return (
//     <div className="search-bar bg-white p-4">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="rounded border p-2"
//       />
//       {/* Additional search bar content */}
//     </div>
//   );
// };

// const UserProfile = () => {
//   const avatarPath = "avatars/vitote.jpg";

//   return (
//     <div className="flex items-center pl-4">
//       <img
//         src={avatarPath}
//         alt="User Avatar"
//         className="h-8 w-8 rounded-full"
//       />
//     </div>
//   );
// };

// const FiltersControls = () => {
//   return (
//     <div className="filters-controls bg-gray-200 p-4">
//       <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
//         Filter Data
//       </button>
//       <select className="rounded border p-2">
//         <option>Option 1</option>
//         <option>Option 2</option>
//         <option>Option 3</option>
//       </select>
//       {/* Additional filters and controls content */}
//     </div>
//   );
// };

// const AnalyticsMetrics = () => {
//   return (
//     <div className="analytics-metrics bg-gray-300 p-4">
//       <h2 className="text-2xl font-bold">Key Metrics</h2>
//       {/* Visualizations and metrics */}
//       {/* ... */}
//     </div>
//   );
// };

// const ActionButtons = () => {
//   return (
//     <div className="action-buttons bg-gray-200 p-4">
//       <button className="mr-2 rounded bg-green-500 px-4 py-2 text-white">
//         Create
//       </button>
//       <button className="mr-2 rounded bg-yellow-500 px-4 py-2 text-white">
//         Edit
//       </button>
//       <button className="rounded bg-red-500 px-4 py-2 text-white">
//         Delete
//       </button>
//       {/* Additional action buttons content */}
//     </div>
//   );
// };

// const HelpSupport = () => {
//   return (
//     <div className="help-support  p-4 text-white">
//       <p>Need help? Contact us:</p>
//       <a href="mailto:support@example.com">support@example.com</a>
//       {/* Additional help and support content */}
//     </div>
//   );
// };
