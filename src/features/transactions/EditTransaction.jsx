import { Form, useLoaderData, redirect } from "react-router-dom";
import apiService from "../../services/apiService";
import SelectorComponent from "../../ui/SelectorComponent";
import { useState } from "react";
import SelectStatus from "../../ui/SelectStatus";
import DatePicker from "../../ui/DatePicker";
import TextInput from "../../ui/TextInput";
import PairDataRow from "../../ui/PairDataRow";
import MutatingSingleColumn from "../../ui/MutatingSingleColumn";
import PairDataRowB from "../../ui/PairDataRowB";
import TextArea from "../../ui/TextArea";

export async function loader({ params }) {
  try {
    const [
      accountsRes,
      trucksRes,
      truckTypeRes,
      customersRes,
      destinationsRes,
      transactionRes,
    ] = await Promise.all([
      apiService.getAllAccounts(),
      apiService.getAllTrucks(),
      apiService.getAllTruckTypes(),
      apiService.getAllCustomers(),
      apiService.getAllDestinations(),
      apiService.getTransactionById(params.transactionNumber),
    ]);

    const accounts = accountsRes.data.map((item) => ({
      ...item,
      key: item.id,
    }));
    const trucks = trucksRes.data.map((item) => ({ ...item, key: item.id }));
    const truckTypes = truckTypeRes.data.map((item) => ({
      ...item,
      key: item.id,
    }));
    const customers = customersRes.data.map((item) => ({
      ...item,
      key: item.id,
    }));
    const destinations = destinationsRes.data.map((item) => ({
      ...item,
      key: item.id,
    }));
    const transaction = transactionRes.data;

    return {
      accounts,
      trucks,
      truckTypes,
      customers,
      destinations,
      transaction,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function action(transactionNumber, formData) {
  try {
    const newTransaction = await apiService.updateTransaction(
      transactionNumber,
      formData,
    );
    return { newTransaction };
    // return redirect("/transactions");
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

export default function EditTransaction() {
  const { accounts, trucks, truckTypes, customers, destinations, transaction } =
    useLoaderData();
  //   const [isDisabled, setIsDisabled] = useState(true);

  const initialData = {
    account_name: transaction.account_name,
    truck_plate: transaction.truck_plate,
    truck_type_name: transaction.truck_type_name,
    customer_name: transaction.customer_name,
    destination_name: transaction.destination_name,
    transaction_date: transaction.transaction_date,
    transaction_shipment_number: transaction.transaction_shipment_number,
    transaction_trip_ticket_number: transaction.transaction_trip_ticket_number,
    transaction_sales_invoice_date: transaction.transaction_sales_invoice_date,
    transaction_sales_invoice_number:
      transaction.transaction_sales_invoice_number,
    transaction_sales_invoice_qty: transaction.transaction_sales_invoice_qty,
    transaction_delivery_receipt_number:
      transaction.transaction_delivery_receipt_number,
    transaction_number_of_cases: transaction.transaction_number_of_cases,
    // transaction_deduction_amount: transaction.transaction_deduction_amount,
    transaction_deduction_remarks:
      transaction.transaction_deduction_remarks ?? "",
    transaction_status: transaction.transaction_status,
    supplier_billing_number: transaction.supplier_billing_number,
    supplier_billing_check_number: transaction.supplier_billing_check_number,
    billing_summary_number: transaction.billing_summary_number,
    billing_summary_check_number: transaction.billing_summary_check_number,
    transaction_remarks: transaction.transaction_remarks,
    transaction_charge_amount: transaction.transaction_charge_amount,
    transaction_subcon_payable_amount:
      transaction.transaction_subcon_payable_amount,
    transaction_truck_rate: transaction.transaction_truck_rate,
    transaction_deduction_amount: transaction.transaction_deduction_amount,
    transaction_value_added_tax: transaction.transaction_value_added_tax,
    transaction_gross_amount: transaction.transaction_gross_amount,
    transaction_withholding_tax: transaction.transaction_withholding_tax,
    transaction_net_payables: transaction.transaction_net_payables,
    transaction_deduction_total: transaction.transaction_deduction_total,
    email: transaction.email,
  };

  const [formData, setFormData] = useState(initialData);
  const [transDate, setTransDate] = useState(transaction.transaction_date);
  const [siTransDate, setSITransDate] = useState(
    transaction.transaction_sales_invoice_date,
  );
  const [transPlate, setTransPlate] = useState(transaction.truck_plate);
  const [transTruckType, setTransTruckType] = useState(
    transaction.truck_type_name,
  );
  const [transCustomer, setTransCustomer] = useState(transaction.customer_name);
  const [transDestination, setTransDestination] = useState(
    transaction.destination_name,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
    try {
      const result = await action(transaction.transaction_number, formData);
      console.log("New Transaction:", result.newTransaction);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  // const handleDelete = async (event) => {
  //   event.preventDefault();
  //   alert(window.confirm("Are you sure you want to delete this item?"));
  //   try {
  //     await apiService.deleteTransaction(transaction.transaction_number);
  //     console.log("Successfully deleted!", transaction.transaction_number);
  //     return <Navigate to="/dashboard" replace={true} />;
  //     // Handle success
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  const handleDelete = async (event) => {
    event.preventDefault();
    // Prompt the user to confirm the deletion
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (confirmation) {
      try {
        // Attempt to delete the transaction
        await apiService.deleteTransaction(transaction.transaction_number);
        console.log("Successfully deleted!", transaction.transaction_number);
        // Redirect to the dashboard after successful deletion
        return redirect("transactions");
        // Handle success
      } catch (error) {
        // Handle error
      }
    } else {
      // User canceled the deletion
      // Optionally, you can provide feedback to the user here
    }
  };

  const handleTransDateChange = (date) => {
    setTransDate(() => date);
    setFormData((prevData) => ({
      ...prevData,
      transaction_date: date,
    }));
  };

  const handlePlateChange = (selectedValue) => {
    setTransPlate(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      truck_plate: selectedValue,
    }));
  };

  const handleTruckTypeChange = (selectedValue) => {
    setTransTruckType(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      truck_type_name: selectedValue,
    }));
  };

  const handleTransTripTicketNumChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_trip_ticket_number: value,
    }));
  };

  const handleCustomerChange = (selectedValue) => {
    setTransCustomer(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      customer_name: selectedValue,
    }));
  };

  const handleDestinationChange = (selectedValue) => {
    setTransDestination(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      destination_name: selectedValue,
    }));
  };

  const handleTransShipmentNumChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_shipment_number: value,
    }));
  };

  const handleSIDateChange = (date) => {
    setSITransDate(() => date);
    setFormData((prevData) => ({
      ...prevData,
      transaction_sales_invoice_date: date,
    }));
  };

  const salesInvoiceDataMapper =
    transaction.transaction_sales_invoice_number.map((number, index) => ({
      transaction_sales_invoice_number: number,
      transaction_sales_invoice_qty: String(
        transaction.transaction_sales_invoice_qty[index],
      ),
    }));

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
  const deliveryReceiptDataMapper =
    transaction.transaction_delivery_receipt_number.map((number) => ({
      transaction_delivery_receipt_number: number,
    }));
  const handleSingleFormattedDataChange = (formattedData) => {
    const deliveryReceiptNumber = formattedData.map(
      (item) => item.transaction_delivery_receipt_number[0],
    );

    setFormData((prevData) => ({
      ...prevData,
      transaction_delivery_receipt_number: deliveryReceiptNumber,
    }));
  };

  const handleTransNumOfCases = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_number_of_cases: value,
    }));
  };

  const deductionDataMapper = transaction.transaction_deduction_amount.map(
    (number, index) => ({
      transaction_deduction_amount: number,
      transaction_deduction_remarks: String(
        transaction.transaction_deduction_remarks[index],
      ),
    }),
  );

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

  const handleTransChargeAmount = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_charge_amount: value,
    }));
  };
  const handleGrossAmount = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_gross_amount: value,
    }));
  };
  const handleVatAmount = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_gross_amount: value,
    }));
  };
  const handleWitholdingAmount = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_withholding_tax: value,
    }));
  };
  const handleNetPayables = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_net_payables: value,
    }));
  };
  const handleDeductionsTotal = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_deduction_total: value,
    }));
  };
  const handleTransactionPaybleToSubcon = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_subcon_payable_amount: value,
    }));
  };
  const handleTruckRate = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_truck_rate: value,
    }));
  };
  const handleSupplierBillingCheckNumber = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      supplier_billing_check_number: value,
    }));
  };
  const handleBillingSummaryCheckNumber = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      billing_summary_check_number: value,
    }));
  };
  const handleRemarksChange = (newRemarks) => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_remarks: newRemarks,
    }));
  };

  console.log(transaction);

  return (
    <>
      <div className="grid h-auto w-full grid-cols-3 gap-4">
        <div className="bg-gray col-span-3 flex h-auto flex-col justify-between gap-2 border-2 border-solid p-2 md:flex-row">
          <h1 className=" mb-4 w-full text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
            {transaction.transaction_number}
          </h1>
        </div>
        <div className="bg-gray col-span-3 flex h-auto flex-col justify-between gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="w-full md:w-1/3">
            <SelectorComponent
              label="Account"
              options={accounts.map((account) => ({
                id: account.id,
                value: account.account_name,
                label: account.account_name,
              }))}
              selectedValue={transaction.account_name}
              onChange={() => {}}
              isDisabled={true}
            />
          </div>
          <div className="w-full self-end md:w-1/3">
            <SelectStatus
              onStatusChange={() => {}}
              selectedStatus={transaction.transaction_status}
              isDisabled={true}
            />
          </div>
        </div>
        <div className="col-span-3 flex h-auto w-full flex-col gap-2 md:flex-row">
          <TextInput
            label="Billing Summary Number"
            id="billing_summary_number"
            placeholder=""
            value={formData.billing_summary_number}
            onChange={() => {}}
            darkMode={true}
          />
          <TextInput
            label="Billing Summary Check Number"
            id="billing_summary_check_number"
            placeholder=""
            value={formData.billing_summary_check_number}
            onChange={handleBillingSummaryCheckNumber}
            darkMode={true}
          />
          <TextInput
            label="Supplier Billing Number"
            id="supplier_billing_number"
            placeholder=""
            value={formData.supplier_billing_number}
            onChange={() => {}}
            darkMode={true}
          />
          <TextInput
            label="Supplier Billing Check Number"
            id="supplier_billing_check_number"
            placeholder=""
            value={formData.supplier_billing_check_number}
            onChange={handleSupplierBillingCheckNumber}
            darkMode={true}
          />
        </div>
        <div className="col-span-3 flex h-auto w-full flex-col gap-2 md:flex-row">
          <TextInput
            label="Charge Amount"
            id="transaction_charge_amount"
            placeholder=""
            value={formData.transaction_charge_amount}
            onChange={handleTransChargeAmount}
            darkMode={false}
          />
          <TextInput
            label="VAT Amount"
            id="transaction_gross_amount"
            placeholder=""
            value={formData.transaction_value_added_tax}
            onChange={handleVatAmount}
            darkMode={false}
          />
          <TextInput
            label="Gross Amount"
            id="transaction_gross_amount"
            placeholder=""
            value={formData.transaction_gross_amount}
            onChange={handleGrossAmount}
            darkMode={false}
          />
          <TextInput
            label="2% Withholding Tax"
            id="transaction_withholding_tax"
            placeholder=""
            value={formData.transaction_withholding_tax}
            onChange={handleWitholdingAmount}
            darkMode={false}
          />

          <TextInput
            label="NET PAYABLES"
            id="transaction_net_payables"
            placeholder=""
            value={formData.transaction_net_payables}
            onChange={handleNetPayables}
            darkMode={false}
          />

          <TextInput
            label="Deductions"
            id="transaction_deduction_total"
            placeholder=""
            value={formData.transaction_deduction_total}
            onChange={handleDeductionsTotal}
            darkMode={false}
          />
          <TextInput
            label="Truck Rate"
            id="transaction_truck_rate"
            placeholder=""
            value={formData.transaction_truck_rate}
            onChange={handleTruckRate}
            darkMode={false}
          />
        </div>
        <div className="col-span-3  h-auto w-full">
          <TextInput
            label="Payable to Truck"
            id="transaction_deduction_total"
            placeholder=""
            value={formData.transaction_subcon_payable_amount}
            onChange={handleTransactionPaybleToSubcon}
            darkMode={true}
          />
        </div>

        {/* Transaction Details */}
        <div className="col-span-3 flex flex-col gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <DatePicker
              label="Transaction Date"
              onChange={handleTransDateChange}
              loadedDate={transDate}
            />
          </div>
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <SelectorComponent
              label="Plate Number"
              options={trucks.map((truck) => ({
                id: truck.id,
                value: truck.truck_plate,
                label: truck.truck_plate,
              }))}
              selectedValue={transPlate}
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
              selectedValue={transTruckType}
              onChange={handleTruckTypeChange}
            />
          </div>
        </div>
        <div className="col-span-3 flex  flex-col gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <TextInput
              label="Trip Ticket Number"
              id="transaction_shipment_number"
              placeholder="Trip Ticket Number"
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
              selectedValue={transCustomer}
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
              selectedValue={transDestination}
              onChange={handleDestinationChange}
            />
          </div>
        </div>
        <div className="col-span-3  flex flex-col gap-2 border-2 border-solid p-2 md:flex-row">
          <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
            <TextInput
              label="Transaction Shipment Number"
              id="transaction_shipment_number"
              placeholder=" Shipment Number"
              value={formData.transaction_shipment_number}
              onChange={handleTransShipmentNumChange}
              darkMode={false}
            />
          </div>
        </div>
        <div className="col-span-3 h-auto w-full gap-2 border-2 border-gray-100 p-2">
          <div className="grid h-auto grid-cols-3 gap-2">
            <div className="col-span-3 h-auto w-full md:w-1/3 ">
              <DatePicker
                label="Sales Invoice Date"
                onChange={handleSIDateChange}
                loadedDate={siTransDate}
              />
            </div>
            <div className="col-span-3 md:col-span-2">
              <PairDataRow
                label1="Sales Invoice Number"
                label2="Sales Invoice Quantity"
                fieldName1="transaction_sales_invoice_number"
                fieldName2="transaction_sales_invoice_qty"
                onFormattedDataChange={handleFormattedDataChange}
                initialData={salesInvoiceDataMapper}
              />
            </div>
            <div className="col-span-3 md:col-span-1">
              <MutatingSingleColumn
                label="Delivery Receipt Number"
                fieldName="transaction_delivery_receipt_number"
                onFormattedDataChange={handleSingleFormattedDataChange}
                initialData={deliveryReceiptDataMapper}
              />
            </div>
            <div className="col-span-3  flex flex-col gap-2 border-2 border-solid p-2 md:flex-row">
              <div className="h-auto border-2 border-solid p-2 sm:w-full md:w-1/3">
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
        </div>
        <div className="bg-gray col-span-3 h-auto w-full border-2 border-solid p-2 md:w-2/3">
          <PairDataRowB
            label1="Deduction Amount"
            label2="Deduction Remarks"
            fieldName3="transaction_deduction_amount"
            fieldName4="transaction_deduction_remarks"
            onFormattedDataChange={handleFormattedDataChangeB}
            initialData={deductionDataMapper}
          />
        </div>
        <div className="bg-gray col-span-3 h-auto border-2 border-solid p-2">
          <TextArea
            label="Transaction Remarks"
            value={formData.transaction_remarks}
            onChange={handleRemarksChange}
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
          >
            <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Save
            </span>
          </button>
        </Form>
        {/* <Form onSubmit={handleDelete}>
          <button
            type="submit"
            className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
          >
            <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Delete
            </span>
          </button>
        </Form> */}
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
            className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
          >
            <span className="relative w-40 rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Delete
            </span>
          </button>
        </Form>
      </div>
    </>
  );
}
