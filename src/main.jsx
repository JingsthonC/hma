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
import Dashboard from "./features/dashboard/Dashboard.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import BillingSummaries, {
  loader as billingSummariesLoader,
} from "./features/billing_summary/BillingSummaries.jsx";
import BillingSummary, {
  loader as billingSummaryLoader,
} from "./features/billing_summary/BillingSummary.jsx";
import AddTransaction, {
  loader as addTransactionLoader,
  action as addTransactionAction,
} from "./features/transactions/AddTransaction.jsx";

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
        element: <Dashboard />,
      },
      {
        path: "transactions",
        loader: transactionsLoader,
        element: <Transactions />,
      },
      {
        path: "transactions/:transactionId",
        loader: transactionLoader,
        element: <Transaction />,
      },
      {
        path: "transactions/edit",
        action: addTransactionAction,
        loader: addTransactionLoader,
        element: <AddTransaction />,
      },
      {
        path: "billing-summary",
        loader: billingSummariesLoader,
        element: <BillingSummaries />,
      },
      {
        path: "billing-summary/:billingSummaryId",
        loader: billingSummaryLoader,
        element: <BillingSummary />,
      },
      {
        path: "supplier-billing",
        element: <div>supplier_billing</div>,
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
