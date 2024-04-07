import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";
import SelectorComponent from "../../ui/SelectorComponent";

const initialState = {
  category_name: "",
  category_base_rate: "",
  category_status: "active",
  account_id: "",
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

export async function loader() {
  try {
    const [accountsRes] = await Promise.all([apiService.getAllAccounts()]);

    return {
      accounts: accountsRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const newCategory = Object.fromEntries(formData);
    console.log("new Category data", newCategory);
    const response = await apiService.createCategory(newCategory); // Adjust this line based on your API service method for creating an account
    if (response.status === 200) {
      alert("Category Creation successful");
    } else {
      alert("Category Creation");
    }
    return redirect(`/categories`);
  } catch (error) {
    console.error("Error creating category:", error);
    return { message: "Error creating category. Please try again later." };
  }
}

export default function AddCategory() {
  const { accounts } = useLoaderData();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleAccountChange = (selectedValue) => {
    console.log("handle account change fired with ", selectedValue);
    dispatch({
      type: "updateField",
      field: "account_id",
      value: selectedValue,
    });
  };

  console.log("state", state);

  return (
    <Form
      method="post"
      //   onSubmit={handleSubmit}
      className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
    >
      <div className="mb-5 flex flex-col gap-5">
        <SelectorComponent
          label="Choose an account"
          options={accounts.map((account) => ({
            id: account.account_id,
            value: account.account_id,
            label: account.account_name,
          }))}
          selectedValue={state.account_name}
          onChange={handleAccountChange}
        />
        <input name="account_id" readOnly hidden value={state.account_id} />
        <LabeledInput
          label="Category Name"
          id="categoryName"
          name="category_name"
          value={state.category_name}
          onChange={handleChange}
        />

        <LabeledInput
          label="Base Rate"
          id="categoryBaseRate"
          name="category_base_rate"
          value={state.category_base_rate}
          onChange={handleChange}
        />
        {/* Status Selector */}
        <StatusSelector
          label="Status"
          id="categoryStatus"
          name="category_status"
          value={state.category_status}
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
