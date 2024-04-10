// import { useState } from "react";
import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [subConsRes] = await Promise.all([apiService.getAllSubCons()]);

    return {
      subCons: subConsRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function SubContractors() {
  const { subCons } = useLoaderData();
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

  // Sort sub cons based on sortConfig
  let sortedSubCons = [...subCons];
  if (sortConfig.key) {
    sortedSubCons.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  // Filter sub cons based on search term
  const filteredSubCons = sortedSubCons.filter((sub_con) => {
    const searchString =
      `${sub_con.sub_con_id} ${sub_con.sub_con_name} ${sub_con.sub_con_owner} ${sub_con.sub_con_phone} ${sub_con.sub_con_email} ${sub_con.sub_con_account_number} ${sub_con.sub_con_status}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-grow justify-between gap-10 p-5">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search sub cons..."
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
          onClick={() => handleSort("sub_con_id")}
        >
          Sub Con Id
          {sortConfig.key === "sub_con_id" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_id" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_name")}>
          Name
          {sortConfig.key === "sub_con_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_owner")}>
          Owner
          {sortConfig.key === "sub_con_owner" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_owner" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_phone")}>
          Phone
          {sortConfig.key === "sub_con_phone" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_phone" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_email")}>
          Email
          {sortConfig.key === "sub_con_email" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_email" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("sub_con_account_number")}
        >
          Account Number
          {sortConfig.key === "sub_con_account_number" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_account_number" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_status")}>
          Status
          {sortConfig.key === "sub_con_status" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_status" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
      </div>

      {/* Customer Rows */}
      {filteredSubCons.map((sub_con) => (
        <Link key={sub_con.sub_con_id} to={`${sub_con.sub_con_id}`}>
          <SubConRow key={sub_con.sub_con_id} sub_con={sub_con} />
        </Link>
      ))}
    </div>
  );
}
const SubConRow = ({ sub_con }) => {
  return (
    <div
      className={`my-2 flex flex-row rounded-lg border border-gray-200 p-4 ${
        sub_con.sub_con_status === "active" ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex-grow font-semibold">{sub_con.sub_con_id}</div>
      <div className="flex-grow">{sub_con.sub_con_name}</div>
      <div className="flex-grow">{sub_con.sub_con_owner}</div>
      <div className="flex-grow">{sub_con.sub_con_phone}</div>
      <div className="flex-grow">{sub_con.sub_con_email}</div>
      <div className="flex-grow">{sub_con.sub_con_account_number}</div>
      <div className="flex-grow">{sub_con.sub_con_status}</div>
    </div>
  );
};
