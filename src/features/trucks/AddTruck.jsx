import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";
import SelectorComponent from "../../ui/SelectorComponent";

const initialState = {
  truck_plate: "",
  sub_con_id: "Select Sub Con",
  sub_con_name: "",
  truck_rate: "",
  truck_status: "active",
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

export async function loader() {
  try {
    const [subConsRes] = await Promise.all([apiService.getAllSubCons()]);

    return {
      subCons: subConsRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const newTruck = Object.fromEntries(formData);
    console.log("new data", newTruck);
    const response = await apiService.createTruck(newTruck); // Adjust this line based on your API service method for creating an account
    if (response.status === 200) {
      alert("Trucks Creation successful");
    } else {
      alert("Trucks Creation");
    }
    return redirect(`/trucks`);
  } catch (error) {
    console.error("Error creating Trucks:", error);
    return { message: "Error creating Trucks. Please try again later." };
  }
}

export default function AddTruck() {
  const { subCons } = useLoaderData();
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

  const handleSubConChange = (selectedValue) => {
    dispatch({
      type: "updateField",
      field: "sub_con_id",
      value: selectedValue,
    });
  };
  console.log("state", state);
  return (
    <Form
      method="post"
      className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
    >
      <div className="mb-5 flex flex-col gap-5">
        <SelectorComponent
          label="Select Sub Con"
          options={subCons.map((sub_con) => ({
            id: sub_con.sub_con_id,
            value: sub_con.sub_con_id,
            label: sub_con.sub_con_name,
          }))}
          selectedValue={state.sub_con_id}
          onChange={handleSubConChange}
        />
        <input name="sub_con_id" readOnly hidden value={state.sub_con_id} />
        <LabeledInput
          label="Truck Plate"
          id="truckPlate"
          name="truck_plate"
          value={state.truck_plate}
          onChange={handleChange}
        />

        <LabeledInput
          label="Rate"
          id="truckRate"
          name="truck_rate"
          value={state.truck_rate}
          onChange={handleChange}
        />
        {/* Status Selector */}
        <StatusSelector
          label="Status"
          id="truckStatus"
          name="truck_status"
          value={state.truck_status}
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
