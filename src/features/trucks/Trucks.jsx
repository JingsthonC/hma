import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [trucksRes] = await Promise.all([apiService.getAllTrucks()]);

    return {
      trucks: trucksRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Trucks() {
  const { trucks } = useLoaderData();
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
  let sortedTrucks = [...trucks];
  if (sortConfig.key) {
    sortedTrucks.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  // Filter sub cons based on search term
  const filteredTrucks = sortedTrucks.filter((truck) => {
    const searchString =
      `${truck.truck_id} ${truck.truck_plate} ${truck.truck_rate} ${truck.truck_status} ${truck.sub_con_owner}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-grow justify-between gap-10 p-5">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search truck..."
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
          onClick={() => handleSort("truck_id")}
        >
          Truck Id
          {sortConfig.key === "truck_id" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_id" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("truck_plate")}>
          Plate
          {sortConfig.key === "truck_plate" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_plate" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("sub_con_name")}>
          Subcon Name
          {sortConfig.key === "sub_con_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "sub_con_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("truck_rate")}>
          Rate
          {sortConfig.key === "truck_rate" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_rate" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("truck_status")}>
          Status
          {sortConfig.key === "truck_status" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_status" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
      </div>

      {/* Truck Rows */}
      {filteredTrucks.map((truck) => (
        <Link key={truck.truck_id} to={`${truck.truck_id}`}>
          <SubConRow key={truck.truck_id} truck={truck} />
        </Link>
      ))}
    </div>
  );
}
const SubConRow = ({ truck }) => {
  return (
    <div
      className={`my-2 flex flex-row rounded-lg border border-gray-200 p-4 ${
        truck.truck_status === "active" ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex-grow font-semibold">{truck.truck_id}</div>
      <div className="flex-grow">{truck.truck_plate}</div>
      <div className="flex-grow">{truck.sub_con_name}</div>
      <div className="flex-grow">{truck.truck_rate}</div>
      <div className="flex-grow">{truck.truck_status}</div>
    </div>
  );
};
