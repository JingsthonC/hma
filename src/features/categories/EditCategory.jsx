import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";

export async function loader({ params }) {
  try {
    const response = await apiService.getCategoryById(params.categoryId);
    const category = response.data;
    return { category }; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const initialState = {
  category_id: "",
  category_name: "",
  category_base_rate: "",
  category_status: "",
  account_name: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export async function action({ request, params }) {
  try {
    const formData = await request.formData();

    const confirmation = window.confirm(
      "Are you sure you want to save the changes?",
    );

    if (confirmation) {
      const updates = Object.fromEntries(formData);
      const response = await apiService.updateCategory(
        params.categoryId,
        updates,
      );

      if (response.status === 200) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    } else {
      alert("Update cancelled");
    }
    return redirect(`/categories`);
  } catch (error) {
    console.error("Error updating category:", error);
    alert("Error updating category. Please try again later.");
  }
}

export default function EditCategory() {
  const navigate = useNavigate();
  const { category } = useLoaderData();
  const [state, dispatch] = useReducer(reducer, category);

  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      <Form
        method="post"
        id="category-form"
        className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
      >
        <div className="mb-5 flex flex-row justify-between  ">
          <h1
            name="category_name"
            className="text-3xl font-extrabold dark:text-white"
          >
            {state.category_id}
          </h1>
          <StatusSelector
            name="category_status"
            id="categoryStatus"
            value={state.category_status}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5 flex flex-col gap-5">
          {/* LabeledInput for Account Name */}
          {/* <div className="mb-5 flex flex-row justify-start  "> */}
          <h1
            name="account_name"
            className="text-3xl font-extrabold dark:text-white"
          >
            {state.account_name}
          </h1>
          {/* </div> */}
          {/* LabeledInput for Email */}
          <input
            name="account_name"
            readOnly
            hidden
            value={state.account_name}
          />
          <LabeledInput
            label="Category Name"
            id="categoryName"
            name="category_name"
            value={state.category_name}
            onChange={handleChange}
          />
          {/* LabeledInput for Fuel Price  */}
          <LabeledInput
            label="Base Rate"
            id="categoryBaseRate"
            name="category_base_rate"
            value={state.category_base_rate}
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
          Delete This Category !
        </button>
      </Form>
    </>
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

function StatusSelector({ name, id, value, onChange }) {
  return (
    <select
      id={id}
      name={name}
      className="block w-auto rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      value={value}
      onChange={onChange}
      style={{ backgroundColor: value === "active" ? "green" : "red" }} // Set background color based on status value
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}
