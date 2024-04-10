import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="bg-gray-500 p-4 text-white">
      <nav>
        <Link to={`dashboard`} className="block py-2 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to={`transactions`} className="block py-2 hover:bg-gray-700">
          Transactions
        </Link>
        <Link to={`billing-summary`} className="block py-2 hover:bg-gray-700">
          Billing Summary
        </Link>
        <Link to={`supplier-billing`} className="block py-2 hover:bg-gray-700">
          Supplier Billing
        </Link>
        <Link to={`accounts`} className="block py-2 hover:bg-gray-700">
          Accounts
        </Link>
        <Link to={`categories`} className="block py-2 hover:bg-gray-700">
          Categories
        </Link>
        <Link to={`destinations`} className="block py-2 hover:bg-gray-700">
          Destinations
        </Link>
        <Link to={`customers`} className="block py-2 hover:bg-gray-700">
          Customer
        </Link>
        <Link to={`subcons`} className="block py-2 hover:bg-gray-700">
          Subcon
        </Link>
        <Link to={`trucks`} className="block py-2 hover:bg-gray-700">
          Trucks
        </Link>
        <Link to={`truck-types`} className="block py-2 hover:bg-gray-700">
          Truck Types
        </Link>
        <Link to={`staffs`} className="block py-2 hover:bg-gray-700">
          Staffs
        </Link>
      </nav>
      {/* Additional sidebar content */}
    </aside>
  );
};

export default Sidebar;
