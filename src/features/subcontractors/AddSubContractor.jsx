import { useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";

const initialState = {
  sub_con_name: "",
  sub_con_owner: "",
  sub_con_phone: "",
  sub_con_email: "",
  sub_con_account_number: "",
  sub_con_status: "active",
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
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const newSubCon = Object.fromEntries(formData);
    console.log("new data", newSubCon);
    const response = await apiService.createSubCon(newSubCon); // Adjust this line based on your API service method for creating an account
    if (response.status === 200) {
      alert("Sub Con Creation successful");
    } else {
      alert("Sub Con Creation");
    }
    return redirect(`/subcons`);
  } catch (error) {
    console.error("Error creating Sub Con:", error);
    return { message: "Error creating Sub Con. Please try again later." };
  }
}

export default function AddSubContractor() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };
  console.log("state", state);
  return (
    <Form
      method="post"
      className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
    >
      <div className="mb-5 flex flex-col gap-5">
        <LabeledInput
          label="Sub Con Name"
          id="sub_conName"
          name="sub_con_name"
          value={state.sub_con_name}
          onChange={handleChange}
        />

        <LabeledInput
          label="Owner"
          id="sub_conName"
          name="sub_con_owner"
          value={state.sub_con_owner}
          onChange={handleChange}
        />

        <LabeledInput
          label="Email"
          id="sub_conEmail"
          name="sub_con_email"
          value={state.sub_con_email}
          onChange={handleChange}
        />

        <LabeledInput
          label="Contact Number"
          id="sub_conContactNumber"
          name="sub_con_phone"
          value={state.sub_con_phone}
          onChange={handleChange}
        />

        <LabeledInput
          label="Account Number"
          id="sub_conAccountNumber"
          name="sub_con_account_number"
          value={state.sub_con_account_number}
          onChange={handleChange}
        />
        {/* Status Selector */}
        <StatusSelector
          label="Status"
          id="sub_conStatus"
          name="sub_con_status"
          value={state.sub_con_status}
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
