import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer, useState } from "react";
import axios from "axios";

const initialState = {
  staff_first_name: "",
  staff_last_name: "",
  staff_email: "",
  staff_contact_number: "",
  staff_position: "",
  staff_birthday: "",
  staff_address_street: "",
  staff_address_city: "",
  staff_address_zip_code: "",
  staff_address_province: "",
  staff_employment_status: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error("Bad Action");
  }
}

export async function action({ request, params }) {
  try {
    const formData = await request.formData();

    console.log("formData", formData);

    const confirmation = window.confirm(
      "Are you sure you want to save the changes?",
    );

    if (confirmation) {
      const updates = Object.fromEntries(formData);
      const response = await apiService.updateStaff(params.staffId, updates);

      if (response.status === 200) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    } else {
      alert("Update cancelled");
    }
    return redirect(`/staffs`);
  } catch (error) {
    console.error("Error updating staff:", error);
    alert("Error updating staff. Please try again later.");
  }
}

export async function loader({ params }) {
  try {
    const [staffRes] = await Promise.all([
      apiService.getStaffById(params.staffId),
    ]);

    return {
      staff: staffRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

export default function EditStaff() {
  const { staff } = useLoaderData();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, staff);
  const [avatarUrl, setAvatarUrl] = useState(staff.staff_avatar_url);
  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleAvatarClick = () => {
    const uploadNewAvatar = window.confirm(
      "Would you like to upload a new avatar?",
    );
    if (uploadNewAvatar) {
      // Trigger the file input
      const fileInput = document.getElementById("avatarInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
    if (file && state.staff_first_name && state.staff_last_name) {
      // Concatenate first name, last name, and file name to create a new file name
      const newFileName = `${state.staff_first_name.toLowerCase()}${state.staff_last_name}.${file.name
        .split(".")
        .pop()}`;
      // Remove spaces from the new file name
      const sanitizedFileName = newFileName.replace(/\s/g, "");

      // Rename the file here
      const renamedFile = new File([file], sanitizedFileName, {
        type: file.type,
      });

      const formData = new FormData();
      formData.append("file", renamedFile);
      formData.append("id", staff.id);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/staffs/image-upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        // Update state with the uploaded image URL
        setAvatarUrl(response.data.imageUrl);
        console.log(response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("Missing required data");
    }
  };

  // Define an array of keys to include
  const keysToInclude = [
    "staff_first_name",
    "staff_middle_name",
    "staff_last_name",
    "staff_ext_name",
    "staff_email",
    "staff_contact_number",
    "staff_address_street",
    "staff_address_city",
    "staff_address_province",
    "staff_address_zip_code",
    "staff_birthday",
    "staff_position",
  ];

  const keysToDisable = ["staff_first_name", "staff_birthday"];

  // Split the keysToInclude array into two arrays for two columns
  const middleIndex = Math.ceil(keysToInclude.length / 2);
  const keysToIncludeLeft = keysToInclude.slice(0, middleIndex);
  const keysToIncludeRight = keysToInclude.slice(middleIndex);

  console.log("state", state);
  return (
    <>
      <Form
        method="post"
        id="staff-form"
        className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
      >
        {/* <div className="mb-5 flex flex-row items-center justify-center">
          <div className="flex-grow text-center font-semibold">
            <div className="flex justify-center">
              <img
                className="mb-3 h-48 w-48 rounded-full shadow-lg"
                src={`${staff.staff_avatar_url}`}
                alt={`${staff.staff_first_name}`}
              />
            </div>
          </div>
        </div> */}

        <div className="mb-5 flex flex-row items-center justify-center">
          <div className="flex-grow text-center font-semibold">
            <div className="flex justify-center">
              <img
                className="mb-3 h-48 w-48 cursor-pointer rounded-full shadow-lg"
                src={avatarUrl}
                alt={staff.staff_first_name}
                onClick={handleAvatarClick}
              />
              {/* Hidden file input */}
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <input name="id" readOnly hidden value={state.id} />
        <div className="mb-5 flex flex-col gap-5 md:flex-row">
          <div className="flex-grow">
            {/* Left column */}
            {/* <h1 className="mb-5 text-3xl font-extrabold dark:text-white">
              {state.staff_last_name}, {state.staff_first_name}
            </h1> */}
            {/* LabeledInputs for the first column */}
            {keysToIncludeLeft.map((key) => (
              <div key={key} className="mb-3">
                <LabeledInput
                  label={key
                    .replace(/_/g, " ")
                    .replace(/^staff /i, "")
                    .toUpperCase()} // Convert underscores to spaces for label, remove "staff" and uppercase
                  id={`staff-${key}`}
                  name={key}
                  value={state[key]}
                  onChange={handleChange}
                  disabled={keysToDisable.includes(key)}
                />
              </div>
            ))}
          </div>
          <div className="flex-grow">
            {/* Right column */}
            {/* LabeledInputs for the second column */}
            {keysToIncludeRight.map((key) => (
              <div key={key} className="mb-3">
                <LabeledInput
                  label={key
                    .replace(/_/g, " ")
                    .replace(/^staff /i, "")
                    .toUpperCase()} // Convert underscores to spaces for label, remove "staff" and uppercase
                  id={`staff-${key}`}
                  name={key}
                  value={state[key]}
                  onChange={handleChange}
                  disabled={keysToDisable.includes(key)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="my-2 flex justify-end">
          <StatusSelector
            name="staff_employment_status"
            id="staffStatus"
            value={state.staff_employment_status}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="mb-2 me-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Save
          </button>
        </div>
      </Form>
      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          className="m-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete This staff !
        </button>
      </Form>
    </>
  );
}

function LabeledInput({ label, id, name, value, onChange, disabled = false }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <label htmlFor={id} className="w-32 self-center">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`block w-auto rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

function StatusSelector({ name, id, value, onChange }) {
  return (
    <select
      id={id}
      name={name}
      className="block w-auto rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      value={value}
      onChange={onChange}
      style={{ backgroundColor: value === "regular" ? "blue" : "white" }} // Set background color based on status value
    >
      <option value="contractual">Contractual</option>
      <option value="regular">Regular</option>
      <option value="awol">AWOL</option>
      <option value="separated">Separated</option>
      <option value="terminated">Terminated</option>
    </select>
  );
}
