import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [truckTypeRes] = await Promise.all([apiService.getAllTruckTypes()]);

    return {
      truckTypes: truckTypeRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function TruckTypes() {
  const { truckTypes } = useLoaderData();
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
  let sortedTruckTypes = [...truckTypes];
  //   if (sortConfig.key) {
  //     sortedTruckTypes.sort((a, b) => {
  //       const aValue = a[sortConfig.key];
  //       const bValue = b[sortConfig.key];
  //       return sortConfig.direction === "asc"
  //         ? aValue.localeCompare(bValue)
  //         : bValue.localeCompare(aValue);
  //     });
  //   }

  if (sortConfig.key) {
    sortedTruckTypes.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Check if both values are numbers
      if (typeof aValue === "number" && typeof bValue === "number") {
        // Check if both numbers are even
        if (aValue % 2 === 0 && bValue % 2 === 0) {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          // If one or both numbers are not even, maintain the original order
          return 0;
        }
      } else {
        // If one or both values are not numbers, compare them as strings
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
  }

  // Filter sub cons based on search term
  const filteredTruckTypes = sortedTruckTypes.filter((truck_type) => {
    const searchString =
      ` ${truck_type.truck_type_name} ${truck_type.truck_type_km_per_liter} ${truck_type.truck_type_status}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-grow justify-between gap-10 p-5">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search truck_type..."
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
        {/* <div
          className="flex-grow font-semibold"
          onClick={() => handleSort("id")}
        >
          Truck T Id
          {sortConfig.key === "id" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "id" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div> */}
        <div
          className="flex-grow"
          onClick={() => handleSort("truck_type_name")}
        >
          Type
          {sortConfig.key === "truck_type_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_type_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("truck_type_km_per_liter")}
        >
          Fuel Consumption
          {sortConfig.key === "truck_type_km_per_liter" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_type_km_per_liter" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("truck_type_status")}
        >
          Status
          {sortConfig.key === "truck_type_status" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "truck_type_status" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
      </div>

      {/* Truck Type Rows */}
      {filteredTruckTypes.map((truck_type) => (
        <Link key={truck_type.id} to={`${truck_type.id}`}>
          <TruckTypeRow key={truck_type.id} truck_type={truck_type} />
        </Link>
      ))}
    </div>
  );
}
const TruckTypeRow = ({ truck_type }) => {
  return (
    <div
      className={`my-2 flex flex-row rounded-lg border border-gray-200 p-4 ${
        truck_type.truck_type_status === "active"
          ? "bg-green-100"
          : "bg-red-100"
      }`}
    >
      {/* <div className="flex-grow font-semibold">{truck_type.truck_type_id}</div> */}
      <div className="flex-grow">{truck_type.truck_type_name}</div>
      {/* <div className="flex-grow">{truck_type.sub_con_name}</div> */}
      <div className="flex-grow">{truck_type.truck_type_km_per_liter}</div>
      <div className="flex-grow">{truck_type.truck_type_status}</div>
    </div>
  );
};

// export default function TruckTypes() {
//   return <div></div>;
// }
