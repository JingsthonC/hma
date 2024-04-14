import { useState } from "react";
import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const [staffsRes] = await Promise.all([apiService.getAllStaffs()]);

    return {
      staffs: staffsRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Staffs() {
  const { staffs } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  console.log("staffs", staffs);

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
  let sortedStaffs = [...staffs];
  if (sortConfig.key) {
    sortedStaffs.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  // Filter sub cons based on search term
  const filteredStaffs = sortedStaffs.filter((staff) => {
    const searchString =
      `${staff.staff_first_name} ${staff.staff_last_name} ${staff.staff_email} ${staff.staff_contact_number} ${staff.staff_position}${staff.staff_employment_status}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-grow justify-between gap-10 p-5">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search staff..."
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
        <div className="flex-grow font-semibold">Avatar</div>
        <div
          className="flex-grow font-semibold"
          onClick={() => handleSort("staff_first_name")}
        >
          First Name
          {sortConfig.key === "staff_first_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_first_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("staff_last_name")}
        >
          Last Name
          {sortConfig.key === "staff_last_name" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_last_name" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("staff_email")}>
          Email
          {sortConfig.key === "staff_email" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_email" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("staff_contact_number")}
        >
          Contact Number
          {sortConfig.key === "staff_contact_number" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_contact_number" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div className="flex-grow" onClick={() => handleSort("staff_position")}>
          Position
          {sortConfig.key === "staff_position" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_position" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
        <div
          className="flex-grow"
          onClick={() => handleSort("staff_employment_status")}
        >
          Employement Status
          {sortConfig.key === "staff_employment_status" &&
            sortConfig.direction === "asc" &&
            "👆"}
          {sortConfig.key === "staff_employment_status" &&
            sortConfig.direction === "desc" &&
            "👇"}
        </div>
      </div>

      {/* Truck Rows */}
      {filteredStaffs.map((staff) => (
        <Link key={staff.id} to={`${staff.id}`}>
          <StaffDetail key={staff.id} staff={staff} />
        </Link>
      ))}
    </div>
  );
}

const StaffDetail = ({ staff }) => {
  return (
    <div
      className={`my-2 flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 sm:gap-4 md:flex-row ${
        staff.staff_employment_status === "regular"
          ? "bg-green-100"
          : "bg-red-100"
      }`}
    >
      <div className="flex-grow font-semibold">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={`${staff.staff_avatar_url}`}
          alt={`${staff.staff_first_name}`}
        />
      </div>
      <div className="flex-grow text-3xl font-semibold">
        {staff.staff_first_name}
      </div>
      <div className="flex-grow text-3xl">{staff.staff_last_name}</div>
      <div className="flex-grow text-3xl">{staff.staff_email}</div>
      <div className="flex-grow text-3xl">{staff.staff_contact_number}</div>
      <div className="flex-grow text-3xl">{staff.staff_position}</div>
      <div className="flex-grow text-3xl">{staff.staff_employment_status}</div>
    </div>
  );
};
