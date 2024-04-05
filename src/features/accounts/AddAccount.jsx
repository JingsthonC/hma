import { Form, redirect, useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";

const initialState = {
  //   account_id: "",
  account_name: "",
  account_phone: "",
  account_email: "",
  account_fuel_price: "",
  account_status: "active", // Set default status to "active"
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const newAccount = Object.fromEntries(formData);
    const response = await apiService.createAccount(newAccount); // Adjust this line based on your API service method for creating an account
    if (response.status === 200) {
      alert("Account Creation successful");
    } else {
      alert("Account Creation");
    }

    //  else {
    //   alert("Account Creation cancelled");
    // }
    return redirect(`/accounts`);
  } catch (error) {
    console.error("Error creating account:", error);
    return { message: "Error creating account. Please try again later." };
  }
}

export default function AddAccount() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // Handle saving of the form data, e.g., send to API
  //     console.log("Form data to save:", state);

  //     // Example: navigate back to accounts page after creating account
  //     navigate("/accounts");
  //   };

  console.log("state", state);

  return (
    <Form
      method="post"
      //   onSubmit={handleSubmit}
      className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
    >
      <div className="mb-5 flex flex-col gap-5">
        {/* LabeledInput for Account Name */}
        <LabeledInput
          label="Account Name"
          id="accountName"
          name="account_name"
          value={state.account_name}
          onChange={handleChange}
        />
        {/* LabeledInput for Email */}
        <LabeledInput
          label="Email"
          id="accountEmail"
          name="account_email"
          value={state.account_email}
          onChange={handleChange}
        />
        {/* LabeledInput for Contact Number */}
        <LabeledInput
          label="Contact Number"
          id="accountPhone"
          name="account_phone"
          value={state.account_phone}
          onChange={handleChange}
        />
        {/* LabeledInput for Fuel Price  */}
        <LabeledInput
          label="Fuel Price"
          id="accountFuelPrice"
          name="account_fuel_price"
          value={state.account_fuel_price}
          onChange={handleChange}
        />
        {/* Status Selector */}
        <StatusSelector
          label="Status"
          id="accountStatus"
          name="account_status"
          value={state.account_status}
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
  );
}

function LabeledInput({ label, id, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <label htmlFor={id} className="w-32 self-center">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="block w-auto rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function StatusSelector({ label, id, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <label htmlFor={id} className="w-32 self-center">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="block w-auto rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value={value}
        onChange={onChange}
        style={{ backgroundColor: value === "active" ? "green" : "red" }}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
