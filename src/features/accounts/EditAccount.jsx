import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import { useReducer } from "react";

const initialState = {
  account_id: "",
  account_name: "",
  account_phone: "",
  account_email: "",
  account_fuel_price: "",
  account_status: "",
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

// export async function action({ request, params }) {
//   // const formData = await request.formData();
//   // const updates = Object.fromEntries(formData);
//   // console.log("request in action, ", updates);
//   // console.log("params in action, ", params.accountId);
//   const formData = await request.formData();

//   // Check if the user wants to proceed with the update
//   const confirmation = window.confirm(
//     "Are you sure you want to save the changes?",
//   );

//   if (confirmation) {
//     const updates = Object.fromEntries(formData);
//     await apiService.updateAccount(params.accountId, updates);
//     return redirect(`/accounts/${params.accountId}`);
//   } else {
//     // Handle cancel case (optional)
//     // You can redirect to a different page or perform any other action
//     return redirect(`/accounts`);
//   }
// }

// export async function action({ request, params }) {
//   try {
//     const formData = await request.formData();
//     const confirmation = window.confirm(
//       "Are you sure you want to save the changes?",
//     );

//     if (confirmation) {
//       const updates = Object.fromEntries(formData);
//       const res = await apiService.updateAccount(params.accountId, updates);
//       console.log("res in action", res);
//       return { message: "Update successful" };
//     } else {
//       return { message: "Update cancelled" };
//     }
//   } catch (error) {
//     console.error("Error updating account:", error);
//     return { message: "Error updating account. Please try again later." };
//   } finally {
//     return redirect("/accounts");
//   }
// }

export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const confirmation = window.confirm(
      "Are you sure you want to save the changes?",
    );

    if (confirmation) {
      const updates = Object.fromEntries(formData);
      const response = await apiService.updateAccount(
        params.accountId,
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
    return redirect(`/accounts`);
  } catch (error) {
    console.error("Error updating account:", error);
    alert("Error updating account. Please try again later.");
  }
}

export async function loader({ params }) {
  try {
    const response = await apiService.getAccountById(params.accountId);
    const account = response.data;
    return { account }; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function EditAccount() {
  const navigate = useNavigate();
  const { account } = useLoaderData();
  const [state, dispatch] = useReducer(reducer, account);

  const handleChange = (e) => {
    // console.log("e.target.value", e.target.value);
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving of the form data, e.g., send to API
    console.log("Form data to save:", state);
  };

  // console.log("State", state);

  return (
    <>
      <Form
        method="post"
        id="account-form"
        className="container w-full gap-5 border-2 border-solid border-green-700 p-5 md:max-w-max"
      >
        <div className="mb-5 flex flex-row justify-between  ">
          <h1 className="text-3xl font-extrabold dark:text-white">
            {state.account_id}
          </h1>
          <StatusSelector
            name="account_status"
            id="accountStatus"
            value={state.account_status}
            onChange={handleChange}
          />
        </div>

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
          className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete This Account!
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
