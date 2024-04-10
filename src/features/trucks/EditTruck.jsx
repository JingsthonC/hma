import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";
import SelectorComponent from "../../ui/SelectorComponent";

const initialState = {
  truck_id: "",
  truck_plate: "",
  sub_con_id: "",
  sub_con_name: "",
  truck_rate: "",
  truck_status: "",
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

export async function action({ request, params }) {
  try {
    const formData = await request.formData();

    const confirmation = window.confirm(
      "Are you sure you want to save the changes?",
    );

    if (confirmation) {
      const updates = Object.fromEntries(formData);
      const response = await apiService.updateTruck(params.truckId, updates);

      if (response.status === 200) {
        alert("Update successful");
      } else {
        alert("Update failed");
      }
    } else {
      alert("Update cancelled");
    }
    return redirect(`/trucks`);
  } catch (error) {
    console.error("Error updating truck:", error);
    alert("Error updating truck. Please try again later.");
  }
}

export async function loader({ params }) {
  try {
    const [subConsRes, truckRes] = await Promise.all([
      apiService.getAllSubCons(),
      apiService.getTruckById(params.truckId),
    ]);

    return {
      subCons: subConsRes?.data || [],
      truck: truckRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to load data" };
  }
}

export default function EditTruck() {
  const { subCons, truck } = useLoaderData();
  const [state, dispatch] = useReducer(reducer, truck);
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
    console.log("test", selectedValue);
    dispatch({
      type: "updateField",
      field: "sub_con_id",
      value: selectedValue,
    });
  };
  console.log("state", state);
  return (
    <>
      <Form
        method="post"
        id="truck-form"
        className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
      >
        <div className="mb-5 flex flex-row justify-between  ">
          <h1
            name="truck_name"
            className="text-3xl font-extrabold dark:text-white"
          >
            {state.truck_id}
          </h1>
          <StatusSelector
            name="truck_status"
            id="truckStatus"
            value={state.truck_status}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5 flex flex-col gap-5">
          {/* LabeledInput for Account Name */}
          {/* <div className="mb-5 flex flex-row justify-start  "> */}
          <h1
            name="truck_plate"
            className="text-3xl font-extrabold dark:text-white"
          >
            {state.truck_plate}
          </h1>
          {/* </div> */}
          {/* LabeledInput for Email */}
          <input name="truck_plate" readOnly hidden value={state.truck_plate} />
          <SelectorComponent
            label="Sub Con"
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
            label="Rate"
            id="truckRate"
            name="truck_rate"
            value={state.truck_rate}
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
          Delete This truck !
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
