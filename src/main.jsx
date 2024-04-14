import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./AuthContext.jsx";
import "./index.css";
// import { AuthProvider } from "./AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./ui/ErrorPage.jsx";
import Transactions, {
  loader as transactionsLoader,
} from "./features/transactions/Transactions.jsx";
import Transaction, {
  loader as transactionLoader,
} from "./features/transactions/Transaction.jsx";
import Dashboard, {
  loader as dashboardDataLoader,
} from "./features/dashboard/Dashboard.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import BillingSummaries, {
  loader as billingSummariesLoader,
  action as addBillingSummaryAction,
} from "./features/billing_summary/BillingSummaries.jsx";
import BillingSummary, {
  loader as billingSummaryLoader,
} from "./features/billing_summary/BillingSummary.jsx";
import AddTransaction, {
  loader as addTransactionLoader,
  action as addTransactionAction,
} from "./features/transactions/AddTransaction.jsx";
import SupplierBillings, {
  loader as supplierBillingsLoader,
  action as addSupplierBillingAction,
} from "./features/supplier_billing/SupplierBillings.jsx";
import SupplierBilling, {
  loader as supplierBillingLoader,
} from "./features/supplier_billing/SupplierBilling.jsx";
import EditTransaction, {
  loader as editTransactionLoader,
  action as editTransasctionAction,
} from "./features/transactions/EditTransaction.jsx";
import { action as destroyTransaction } from "./features/transactions/destroy.jsx";
import EditBillingSummary, {
  loader as editBillingSummaryLoader,
} from "./features/billing_summary/EditBillingSummary.jsx";
import Accounts, {
  loader as accountsLoader,
} from "./features/accounts/Accounts.jsx";

import EditAccount, {
  loader as accountLoader,
  action as editAccountAction,
} from "./features/accounts/EditAccount.jsx";

import { action as destroyAccountAction } from "./features/accounts/DestroyAccount.jsx";
import AddAccount, {
  action as addAccountAction,
} from "./features/accounts/AddAccount.jsx";
import Categories, {
  loader as categoriesLoader,
} from "./features/categories/Categories.jsx";
import EditCategory, {
  loader as categoryLoader,
  action as editCategoryAction,
} from "./features/categories/EditCategory.jsx";
import { action as destroyCategoryAction } from "./features/categories/DestroyCategory.jsx";
import AddCategory, {
  loader as addCategoryLoader,
  action as addCategoryAction,
} from "./features/categories/AddCategory.jsx";
import Destinations, {
  loader as destinationsLoader,
} from "./features/destinations/Destinations.jsx";
import EditDestination, {
  loader as destinationLoader,
  action as editDestinationAction,
} from "./features/destinations/EditDestination.jsx";
import { action as destroyDestinationAction } from "./features/destinations/destroyDestination.js";
import AddDestination, {
  loader as addDestinationLoader,
  action as addDestinationAction,
} from "./features/destinations/AddDestination.jsx";
import Customers, {
  loader as customersLoader,
} from "./features/customers/Customers.jsx";
import EditCustomer, {
  loader as customerLoader,
  action as editCustomerAction,
} from "./features/customers/EditCustomer.jsx";
import { action as destroyCustomerAction } from "./features/customers/destroyCustomer.js";
import AddCustomer, {
  action as addCustomerAction,
} from "./features/customers/AddCustomer.jsx";
import SubContractors, {
  loader as subConsLoader,
} from "./features/subcontractors/SubContractors.jsx";
import EditSubContractor, {
  loader as subConLoader,
  action as editSubConAction,
} from "./features/subcontractors/EditSubContractor.jsx";
import AddSubContractor, {
  action as addSubConAction,
} from "./features/subcontractors/AddSubContractor.jsx";
import { action as destroySubConAction } from "./features/subcontractors/destroySubContractor.js";
import Trucks, { loader as trucksLoader } from "./features/trucks/Trucks.jsx";
import EditTruck, {
  loader as truckLoader,
  action as editTruckAction,
} from "./features/trucks/EditTruck.jsx";
import { action as destroyTruckAction } from "./features/trucks/destroyTruck.js";
import AddTruck, {
  loader as addTruckSubConLoader,
  action as addTruckAction,
} from "./features/trucks/AddTruck.jsx";
import TruckTypes, {
  loader as truckTypesLoader,
} from "./features/truck_types/TruckTypes.jsx";
import EditTruckType, {
  action as editTruckTypeAction,
  loader as truckTypeLoader,
} from "./features/truck_types/EditTruckType.jsx";
import AddTruckType, {
  action as addTruckTypeAction,
} from "./features/truck_types/AddTruckType.jsx";
import { action as destroyTruckTypeAction } from "./features/truck_types/destoryTruckType.js";
import RegisterStaff, {
  action as registerStaffAction,
} from "./features/staffs/RegisterStaff.jsx";
import Staffs, { loader as staffsLoader } from "./features/staffs/Staffs.jsx";
import EditStaff, {
  loader as staffLoader,
  action as editStaffAction,
} from "./features/staffs/EditStaff.jsx";
import { action as destroyStaffAction } from "./features/staffs/destroyStaff.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        loader: dashboardDataLoader,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        loader: transactionsLoader,
        element: <Transactions />,
      },
      {
        path: "transactions/add",
        action: addTransactionAction,
        loader: addTransactionLoader,
        element: <AddTransaction />,
      },
      {
        path: "transactions/:transactionNumber",
        loader: transactionLoader,
        element: <Transaction />,
      },
      {
        path: "transactions/:transactionNumber/edit",
        loader: editTransactionLoader,
        action: editTransasctionAction,
        element: <EditTransaction />,
      },
      {
        path: "transactions/:transactionNumber/edit/destroy",
        action: destroyTransaction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "billing-summary",
        action: addBillingSummaryAction,
        loader: billingSummariesLoader,
        element: <BillingSummaries />,
      },

      {
        path: "billing-summary/:billingSummaryId",
        loader: billingSummaryLoader,
        element: <BillingSummary />,
      },
      {
        path: "billing-summary/:billingSummaryId/edit",
        loader: editBillingSummaryLoader,
        element: <EditBillingSummary />,
      },
      {
        path: "supplier-billing",
        action: addSupplierBillingAction,
        loader: supplierBillingsLoader,
        element: <SupplierBillings />,
      },
      {
        path: "supplier-billing/:supplierBillingId",
        loader: supplierBillingLoader,
        element: <SupplierBilling />,
      },
      {
        path: "accounts",
        loader: accountsLoader,
        element: <Accounts />,
      },
      {
        path: "accounts/add",
        action: addAccountAction,
        element: <AddAccount />,
      },
      {
        path: "accounts/:accountId",
        loader: accountLoader,
        action: editAccountAction,
        element: <EditAccount />,
      },
      {
        path: "accounts/:accountId/destroy",
        action: destroyAccountAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "categories",
        loader: categoriesLoader,
        element: <Categories />,
      },
      {
        path: "categories/add",
        loader: addCategoryLoader,
        action: addCategoryAction,
        element: <AddCategory />,
      },
      {
        path: "categories/:categoryId",
        loader: categoryLoader,
        action: editCategoryAction,
        element: <EditCategory />,
      },
      {
        path: "categories/:categoryId/destroy",
        action: destroyCategoryAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "destinations",
        loader: destinationsLoader,
        element: <Destinations />,
      },
      {
        path: "destinations/add",
        loader: addDestinationLoader,
        action: addDestinationAction,
        element: <AddDestination />,
      },
      {
        path: "destinations/:destinationId",
        loader: destinationLoader,
        action: editDestinationAction,
        element: <EditDestination />,
      },
      {
        path: "destinations/:destinationId/destroy",
        action: destroyDestinationAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "customers",
        loader: customersLoader,
        element: <Customers />,
      },
      {
        path: "customers/add",
        action: addCustomerAction,
        element: <AddCustomer />,
      },
      {
        path: "customers/:customerId",
        loader: customerLoader,
        action: editCustomerAction,
        element: <EditCustomer />,
      },
      {
        path: "customers/:customerId/destroy",
        action: destroyCustomerAction,
        errorElement: <div>Oops! There was an error.</div>,
      },

      {
        path: "subcons",
        loader: subConsLoader,
        element: <SubContractors />,
      },
      {
        path: "subcons/add",
        loader: addTruckSubConLoader,
        action: addSubConAction,
        element: <AddSubContractor />,
      },
      {
        path: "subcons/:subConId",
        loader: subConLoader,
        action: editSubConAction,
        element: <EditSubContractor />,
      },
      {
        path: "subcons/:subConId/destroy",
        action: destroySubConAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "trucks",
        loader: trucksLoader,
        element: <Trucks />,
      },
      {
        path: "trucks/add",
        loader: addTruckSubConLoader,
        action: addTruckAction,
        element: <AddTruck />,
      },
      {
        path: "trucks/:truckId",
        loader: truckLoader,
        action: editTruckAction,
        element: <EditTruck />,
      },
      {
        path: "trucks/:truckId/destroy",
        action: destroyTruckAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "truck-types",
        loader: truckTypesLoader,
        element: <TruckTypes />,
      },
      {
        path: "truck-types/add",
        action: addTruckTypeAction,
        element: <AddTruckType />,
      },
      {
        path: "truck-types/:truckTypeId",
        loader: truckTypeLoader,
        action: editTruckTypeAction,
        element: <EditTruckType />,
      },
      {
        path: "truck-types/:truckTypeId/destroy",
        action: destroyTruckTypeAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "staffs",
        loader: staffsLoader,
        element: <Staffs />,
      },
      {
        path: "staffs/add",
        action: registerStaffAction,
        element: <RegisterStaff />,
      },
      {
        path: "staffs/:staffId",
        loader: staffLoader,
        action: editStaffAction,
        element: <EditStaff />,
      },
      {
        path: "staffs/:staffId/destroy",
        action: destroyStaffAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "signin",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
