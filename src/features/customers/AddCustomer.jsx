import { useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";

const initialState = {
  customer_email: "",
  customer_id: "",
  customer_name: "",
  customer_phone: "",
  customer_status: "active",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialState;
    default:
      state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const newCustomer = Object.fromEntries(formData);
    console.log("new data", newCustomer);
    const response = await apiService.createCustomer(newCustomer); // Adjust this line based on your API service method for creating an account
    if (response.status === 200) {
      alert("Customer Creation successful");
    } else {
      alert("Customer Creation");
    }
    return redirect(`/customers`);
  } catch (error) {
    console.error("Error creating customer:", error);
    return { message: "Error creating customer. Please try again later." };
  }
}

export default function AddCustomer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  }

  console.log(state);
  return (
    <Form
      method="post"
      className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
    >
      <div className="mb-5 flex flex-col gap-5">
        <LabeledInput
          label="Customer Name"
          id="customerName"
          name="customer_name"
          value={state.customer_name}
          onChange={handleChange}
        />

        <LabeledInput
          label="Email"
          id="customerEmail"
          name="customer_email"
          value={state.customer_email}
          onChange={handleChange}
        />

        <LabeledInput
          label="Contact Number"
          id="customerContactNumber"
          name="customer_phone"
          value={state.customer_phone}
          onChange={handleChange}
        />
        {/* Status Selector */}
        <StatusSelector
          label="Status"
          id="customerStatus"
          name="customer_status"
          value={state.customer_status}
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
