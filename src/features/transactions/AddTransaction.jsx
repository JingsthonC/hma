import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
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

const storedUser = JSON.parse(localStorage.getItem("user"));

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

// export async function action(formData) {
//   console.log("form data at async function action", formData);
//   try {
//     const newTransaction = await apiService.addTransaction(formData);
//     return { newTransaction };
//   } catch (error) {
//     console.error("Error adding transaction:", error);
//   }
// }

export async function action(formData) {
  console.log("form data at async function action", formData);
  try {
    const newTransaction = await apiService.addTransaction(formData);
    return { newTransaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    // Log response data if available
    if (error.response) {
      console.log("Response data:", error.response.data);
    }
  }
}
export default function AddTransaction() {
  const navigate = useNavigate();
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
    transaction_number_of_cases: 0,
    transaction_deduction_amount: [],
    transaction_deduction_remarks: [],
    transaction_status: "not_yet_processed",
    supplier_billing_number: "",
    supplier_billing_check_number: "",
    billing_summary_number: "",
    billing_summary_check_number: "",
    transaction_remarks: "",
    // email: storedUser.email && storedUser.email,
  };

  const [formData, setFormData] = useState(initialData);
  const [selectedAccount, setSelectedAccount] = useState("Choose an account");
  const [selectedPlateNumber, setSelectedPlateNumber] = useState(
    "Select Plate Number",
  );
  const [selectedTruckType, setSelectedTruckType] =
    useState("Select Truck Type");
  const [selectedCustomer, setSelectedCustomer] = useState("Select Customer");
  const [selectedDestination, setSelectedDestination] =
    useState("Select Destination");

  const fieldName = "transaction_delivery_receipt_number";
  const fieldName1 = "transaction_sales_invoice_number";
  const fieldName2 = "transaction_sales_invoice_qty";
  const fieldName3 = "transaction_deduction_amount";
  const fieldName4 = "transaction_deduction_remarks";

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
    try {
      const result = await action(formData);
      console.log("New Transaction:", result.newTransaction);

      navigate("/transactions");
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const handleAccountChange = (selectedValue) => {
    setSelectedAccount(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      account_name: selectedValue,
    }));
  };

  const handlePlateChange = (selectedValue) => {
    setSelectedPlateNumber(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      truck_plate: selectedValue,
    }));
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
    <>
      <div className="grid h-auto w-full grid-cols-3 gap-4">
        <div className="bg-gray col-span-3 flex h-auto flex-col justify-between gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="w-full md:w-1/3">
            <SelectorComponent
              label="Choose an account"
              options={accounts.map((account) => ({
                id: account.id,
                value: account.account_name,
                label: account.account_name,
              }))}
              selectedValue={selectedAccount}
              onChange={handleAccountChange}
            />
          </div>
          <div className="w-full md:w-1/3">
            <SelectStatus
              onStatusChange={handleStatusChange}
              selectedStatus={formData.transaction_status}
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <DatePicker
              label="Transaction Date"
              onChange={handleTransDateChange}
            />
          </div>
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <SelectorComponent
              label="Select Plate Number"
              options={trucks.map((truck) => ({
                id: truck.id,
                value: truck.truck_plate,
                label: truck.truck_plate,
              }))}
              selectedValue={selectedPlateNumber}
              onChange={handlePlateChange}
            />
          </div>
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
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
          </div>
        </div>
        <div className="col-span-3 flex  flex-col gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <TextInput
              label="Trip Ticket Number"
              id="transaction_shipment_number"
              placeholder=" Trip Ticket Number"
              value={formData.transaction_trip_ticket_number}
              onChange={handleTransTripTicketNumChange}
              darkMode={false}
            />
          </div>
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
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
          </div>
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
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
          </div>
        </div>
        <div className="bg-gray col-span-3 h-auto w-full border-2 border-solid p-2 md:w-1/3">
          <TextInput
            label="Transaction Shipment Number"
            id="transaction_shipment_number"
            placeholder=" Shipment Number"
            value={formData.transaction_shipment_number}
            onChange={handleTransShipmentNumChange}
            darkMode={false}
          />
        </div>

        <div className="col-span-3 h-auto w-full gap-2 border-2 border-gray-100 p-2">
          <div className="grid h-auto grid-cols-3 gap-2">
            <div className="col-span-3 h-auto w-full md:w-1/3 ">
              <DatePicker
                label="Sales Invoice Date"
                onChange={handleSIDateChange}
              />
            </div>
            <div className="col-span-3 md:col-span-2">
              {/* <PairDataRow
                label1="Sales Invoice Number"
                label2=" Sales Invoice Quantity"
                fieldName1="transaction_sales_invoice_number"
                fieldName2="transaction_sales_invoice_qty"
                onFormattedDataChange={handleFormattedDataChange}
                initialData={[{ [fieldName1]: "", [fieldName2]: "" }]}
              /> */}
              <PairDataRow
                label1="Sales Invoice Number"
                label2=" Sales Invoice Quantity"
                fieldName1="transaction_sales_invoice_number"
                fieldName2="transaction_sales_invoice_qty"
                onFormattedDataChange={handleFormattedDataChange}
                initialData={[{ [fieldName1]: "", [fieldName2]: "" }]}
              />
            </div>
            <div className="col-span-3 md:col-span-1">
              <MutatingSingleColumn
                label="Delivery Receipt Number"
                fieldName="transaction_delivery_receipt_number"
                onFormattedDataChange={handleSingleFormattedDataChange}
                initialData={[{ [fieldName]: "" }]}
              />
            </div>
            <div className="col-span-3 h-auto w-full">
              <TextInput
                label="Number of Cases"
                id="transaction_number_of_cases"
                placeholder="Number of Cases"
                value={formData.transaction_number_of_cases}
                onChange={handleTransNumOfCases}
                darkMode={false}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray col-span-3 h-auto w-full border-2 border-solid p-2 md:w-2/3">
          <PairDataRowB
            label1="Deduction Amount"
            label2="Deduction Remarks"
            fieldName3="transaction_deduction_amount"
            fieldName4="transaction_deduction_remarks"
            onFormattedDataChange={handleFormattedDataChangeB}
            initialData={[{ [fieldName3]: "", [fieldName4]: "" }]}
          />
        </div>

        <div className="bg-gray col-span-3 h-auto border-2 border-solid p-2">
          <TextArea
            label="Transaction Remarks"
            value={formData.transaction_remarks}
            onChange={handleRemarksChange}
          />
        </div>
        <div className="col-span-3 flex h-auto w-full justify-center">
          <Form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
            >
              <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Save
              </span>
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
