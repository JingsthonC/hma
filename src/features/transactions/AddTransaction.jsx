import { useLoaderData, Form } from "react-router-dom";
import apiService from "../../services/apiService";
import { useState } from "react";
import SelectorComponent from "../../ui/SelectorComponent";
import DatePicker from "../../ui/DatePicker";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import PairDataRow from "../../ui/PairDataRow";
import PairDataRowB from "../../ui/PairDataRowB";
import MutatingSingleColumn from "../../ui/MutatingSingleColumn";
import SelectStatus from "../../ui/SelectStatus";

export async function loader({ params }) {
  try {
    const accountsRes = await apiService.getAllAccounts();
    const accountsData = accountsRes.data;
    const accounts = accountsData.map((item) => ({ ...item, key: item.id }));

    const trucksRes = await apiService.getAllTrucks();
    const trucksData = trucksRes.data;
    const trucks = trucksData.map((item) => ({ ...item, key: item.id }));

    const truckTypeRes = await apiService.getAllTruckTypes();
    const truckTypeData = truckTypeRes.data;
    const truckTypes = truckTypeData.map((item) => ({ ...item, key: item.id }));

    const customersRes = await apiService.getAllCustomers();
    const customersData = customersRes.data;
    const customers = customersData.map((item) => ({ ...item, key: item.id }));

    const destinationsRes = await apiService.getAllDestinations();
    const destinationsData = destinationsRes.data;
    const destinations = destinationsData.map((item) => ({
      ...item,
      key: item.id,
    }));

    return {
      accounts: accounts,
      trucks: trucks,
      truckTypes: truckTypes,
      customers: customers,
      destinations: destinations,
    }; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function action(formData) {
  try {
    const newTransaction = await apiService.addTransaction(formData);
    return { newTransaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}
export default function AddTransaction() {
  const { accounts, trucks, truckTypes, customers, destinations } =
    useLoaderData();

  const initialData = {
    account_name: "",
    truck_plate: "",
    truck_type_name: "",
    customer_name: "",
    destination_name: "",
    transaction_date: "",
    transaction_shipment_number: "",
    transaction_trip_ticket_number: "",
    transaction_sales_invoice_date: "",
    transaction_sales_invoice_number: [],
    transaction_sales_invoice_qty: [],
    transaction_delivery_receipt_number: [],
    transaction_number_of_cases: "",
    transaction_deduction_amount: [],
    transaction_deduction_remarks: [],
    transaction_status: "not_yet_processed",
    supplier_billing_number: "",
    supplier_billing_check_number: "",
    billing_summary_number: "",
    billing_summary_check_number: "",
    transaction_remarks: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [selectedAccount, setSelectedAccount] = useState("Choose a account");
  const [selectedPlateNumber, setSelectedPlateNumber] = useState(
    "Select Plate Number",
  );
  const [selectedTruckType, setSelectedTruckType] =
    useState("Select Truck Type");
  const [selectedCustomer, setSelectedCustomer] = useState("Select Customer");
  const [selectedDestination, setSelectedDestination] =
    useState("Select Destination");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await action(formData);
      console.log("New Transaction:", result.newTransaction);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleAccountChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAccount(selectedValue);
    setFormData((prevData) => ({ ...prevData, account_name: selectedValue }));
  };

  const handlePlateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPlateNumber(selectedValue);
    setFormData((prevData) => ({ ...prevData, truck_plate: selectedValue }));
  };

  const handleTruckTypeChange = (selectedValue) => {
    setSelectedTruckType(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      truck_type_name: selectedValue,
    }));
  };

  const handleCustomerChange = (selectedValue) => {
    setSelectedCustomer(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      customer_name: selectedValue,
    }));
  };

  const handleDestinationChange = (selectedValue) => {
    setSelectedDestination(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      destination_name: selectedValue,
    }));
  };

  const handleTransDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_date: date,
    }));
  };
  const handleSIDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_sales_invoice_date: date,
    }));
  };

  const handleTransShipmentNumChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_shipment_number: value,
    }));
  };

  const handleTransTripTicketNumChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_trip_ticket_number: value,
    }));
  };

  const handleTransNumOfCases = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_number_of_cases: value,
    }));
  };

  const handleRemarksChange = (newRemarks) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_remarks: newRemarks,
    }));
  };

  const handleFormattedDataChange = (formattedData) => {
    const salesInvoice = formattedData.map(
      (item) => item.transaction_sales_invoice_number[0],
    );
    const salesInvoiceQty = formattedData.map(
      (item) => item.transaction_sales_invoice_qty[0],
    );

    setFormData((prevData) => ({
      ...prevData,
      transaction_sales_invoice_number: salesInvoice,
      transaction_sales_invoice_qty: salesInvoiceQty,
    }));
  };

  const handleFormattedDataChangeB = (formattedData) => {
    const deductAmount = formattedData.map(
      (item) => item.transaction_deduction_amount[0],
    );
    const deductRemarks = formattedData.map(
      (item) => item.transaction_deduction_remarks[0],
    );

    setFormData((prevData) => ({
      ...prevData,
      transaction_deduction_amount: deductAmount,
      transaction_deduction_remarks: deductRemarks,
    }));
  };

  const handleSingleFormattedDataChange = (formattedData) => {
    const deliveryReceiptNumber = formattedData.map(
      (item) => item.transaction_delivery_receipt_number[0],
    );

    setFormData((prevData) => ({
      ...prevData,
      transaction_delivery_receipt_number: deliveryReceiptNumber,
    }));
  };

  const handleStatusChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_status: newValue,
    }));
  };

  console.log(formData);
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="mt-4 ">
        <form className="mx-auto max-w-sm">
          <label
            htmlFor="accounts"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an account
          </label>
          <select
            id="accounts"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={selectedAccount}
            onChange={handleAccountChange}
          >
            <option value="Choose a account" disabled>
              Choose a account
            </option>
            {accounts.map((account) => (
              <option key={account.id} value={account.account_name}>
                {account.account_name}
              </option>
            ))}
          </select>
        </form>
      </div>
      {/* for trucks */}
      <div className="mt-4 ">
        <form className="mx-auto max-w-sm">
          <label
            htmlFor="truck_plates"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Plate Number
          </label>
          <select
            id="truck_plates"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={selectedPlateNumber}
            onChange={handlePlateChange}
          >
            <option value="Select Plate Number" disabled>
              Select Plate Number
            </option>
            {trucks.map((truck) => (
              <option key={truck.id} value={truck.truck_plate}>
                {truck.truck_plate}
              </option>
            ))}
          </select>
        </form>
      </div>
      <SelectorComponent
        label="Select Truck Type"
        options={truckTypes.map((truckType) => ({
          id: truckType.id,
          value: truckType.truck_type_name,
          label: truckType.truck_type_name,
        }))}
        selectedValue={selectedTruckType}
        onChange={handleTruckTypeChange}
      />
      <SelectorComponent
        label="Select Customer"
        options={customers.map((customer) => ({
          id: customer.id,
          value: customer.customer_name,
          label: customer.customer_name,
        }))}
        selectedValue={selectedCustomer}
        onChange={handleCustomerChange}
      />
      <SelectorComponent
        label="Select Destination"
        options={destinations.map((destination) => ({
          id: destination.id,
          value: destination.destination_name,
          label: destination.destination_name,
        }))}
        selectedValue={selectedDestination}
        onChange={handleDestinationChange}
      />
      <DatePicker label="Transaction Date" onChange={handleTransDateChange} />
      <DatePicker label="Sales Invoice Date" onChange={handleSIDateChange} />
      <TextInput
        label="Transaction Shipment Number"
        id="transaction_shipment_number"
        placeholder=" Shipment Number"
        value={formData.transaction_shipment_number}
        onChange={handleTransShipmentNumChange}
        darkMode={false}
      />
      <TextInput
        label="Trip Ticket Number"
        id="transaction_shipment_number"
        placeholder=" Trip Ticket Number"
        value={formData.transaction_trip_ticket_number}
        onChange={handleTransTripTicketNumChange}
        darkMode={false}
      />
      f
      <TextInput
        label="Number of Cases"
        id="transaction_number_of_cases"
        placeholder="Number of Cases"
        value={formData.transaction_number_of_cases}
        onChange={handleTransNumOfCases}
        darkMode={false}
      />
      <TextArea
        label="Transaction Remarks"
        value={formData.transaction_remarks}
        onChange={handleRemarksChange}
      />
      <PairDataRow
        label1="Sales Invoice Number"
        label2=" Sales Invoice Quantity"
        fieldName1="transaction_sales_invoice_number"
        fieldName2="transaction_sales_invoice_qty"
        onFormattedDataChange={handleFormattedDataChange}
      />
      <PairDataRowB
        label1="Deduction Amount"
        label2="Deduction Remarks"
        fieldName1="transaction_deduction_amount"
        fieldName2="transaction_deduction_remarks"
        onFormattedDataChange={handleFormattedDataChangeB}
      />
      <MutatingSingleColumn
        label="Delivery Receipt Number"
        fieldName="transaction_delivery_receipt_number"
        onFormattedDataChange={handleSingleFormattedDataChange}
      />
      <SelectStatus
        onStatusChange={handleStatusChange}
        selectedStatus={formData.transaction_status}
      />
      <Form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </Form>
    </div>
  );
}
