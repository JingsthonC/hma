import React from "react";
import ReactDOM from "react-dom/client";
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
import { AuthProvider } from "./AuthContext.jsx";
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
        element: <div>accounts</div>,
      },
      {
        path: "subcons",
        element: <div>subcons</div>,
      },
      {
        path: "trucks",
        element: <div>trucks</div>,
      },
      {
        path: "truck-types",
        element: <div>truck-types</div>,
      },
      {
        path: "customers",
        element: <div>customer</div>,
      },
      {
        path: "categories",
        element: <div>categories</div>,
      },
      {
        path: "destinations",
        element: <div>destinations</div>,
      },
      {
        path: "accounts",
        element: <div>accounts</div>,
      },
      {
        path: "staffs",
        element: <div>staffs</div>,
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
