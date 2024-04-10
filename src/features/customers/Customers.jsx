// import { useState } from "react";
import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [customersRes] = await Promise.all([apiService.getAllCustomers()]);

    return {
      customers: customersRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Customers() {
  const { customers } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        // Toggle sorting direction
        const direction = prevConfig.direction === "asc" ? "desc" : "asc";
        return { ...prevConfig, direction };
      } else {
        // Set sorting key and direction
        return { key, direction: "asc" };
      }
    });
  };

  // Sort customers based on sortConfig
  let sortedCustomers = [...customers];
  if (sortConfig.key) {
    sortedCustomers.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  // Filter customers based on search term
  const filteredCustomers = sortedCustomers.filter((customer) => {
    const searchString =
      `${customer.customer_id} ${customer.customer_name} ${customer.customer_phone} ${customer.customer_email} ${customer.customer_status}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-grow justify-between gap-10 p-5">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search customers..."
          className="mb-4 w-1/2 rounded-lg border border-gray-300 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link to={`add`}>
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            type="submit"
          >
            New
          </button>
        </Link>
      </div>

      {/* Title Row */}
      <div className="flex flex-row rounded-lg border border-gray-200 p-4">
        <div
          className="flex-grow font-semibold"
          onClick={() => handleSort("customer_id")}
        >
          Customer Id
          {sortConfig.key === "customer_id" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "customer_id" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("customer_name")}>
          Customer Name
          {sortConfig.key === "customer_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "customer_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("customer_phone")}>
          Customer Phone
          {sortConfig.key === "customer_phone" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "customer_phone" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("customer_email")}>
          Customer Email
          {sortConfig.key === "customer_email" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "customer_email" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("customer_status")}
        >
          Customer Status
          {sortConfig.key === "customer_status" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "customer_status" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
      </div>

      {/* Customer Rows */}
      {filteredCustomers.map((customer) => (
        <Link key={customer.customer_id} to={`${customer.customer_id}`}>
          <CustomerRow key={customer.customer_id} customer={customer} />
        </Link>
      ))}
    </div>
  );
}
const CustomerRow = ({ customer }) => {
  return (
    <div
      className={`my-2 flex flex-row rounded-lg border border-gray-200 p-4 ${
        customer.customer_status === "active" ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex-grow font-semibold">{customer.customer_id}</div>
      <div className="flex-grow">{customer.customer_name}</div>
      <div className="flex-grow">{customer.customer_phone}</div>
      <div className="flex-grow">{customer.customer_email}</div>
      <div className="flex-grow">{customer.customer_status}</div>
    </div>
  );
};
