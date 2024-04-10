import axios from "axios";

const BASE_URL = "http://localhost:4000"; // Update with your backend server URL

const apiService = {
  // Users
  getAllUsers: () => axios.get(`${BASE_URL}/api/users`),
  getUserById: (id) => axios.get(`${BASE_URL}/api/user/${id}`),
  updateUser: (id, data) => axios.put(`${BASE_URL}/api/user/${id}`, data),
  deleteUser: (id) => axios.delete(`${BASE_URL}/api/user/${id}`),

  // Staffs
  getAllStaffs: () => axios.get(`${BASE_URL}/api/staffs`),
  getStaffById: (id) => axios.get(`${BASE_URL}/api/staff/${id}`),
  updateStaff: (id, data) => axios.put(`${BASE_URL}/api/staff/${id}`, data),
  deleteStaff: (id) => axios.delete(`${BASE_URL}/api/staff/${id}`),

  // Accounts
  // getAllAccounts: () => axios.get(`${BASE_URL}/api/accounts`),
  // getAccountById: (id) => axios.get(`${BASE_URL}/api/accounts/${id}`),
  // updateAccount: (id, data) =>
  //   axios.put(`${BASE_URL}/api/accounts/${id}`, data),
  // deleteAccount: (id) => axios.delete(`${BASE_URL}/api/accounts/${id}`),
  getAllAccounts: () => axios.get(`${BASE_URL}/api/accounts`),
  getAccountById: (id) => axios.get(`${BASE_URL}/api/accounts/${id}`),
  updateAccount: (id, data) =>
    axios.put(`${BASE_URL}/api/accounts/${id}`, data),
  deleteAccount: (id) => axios.delete(`${BASE_URL}/api/accounts/${id}`),

  createAccount: (data) => axios.post(`${BASE_URL}/api/accounts`, data),
  sortAccounts: () => axios.get(`${BASE_URL}/api/accounts/sort`),
  filterAccounts: (params) =>
    axios.get(`${BASE_URL}/api/accounts/filter`, { params }),

  // Trucks
  getAllTrucks: () => axios.get(`${BASE_URL}/api/trucks`),
  createTruck: (data) => axios.post(`${BASE_URL}/api/trucks`, data),
  getTruckById: (id) => axios.get(`${BASE_URL}/api/trucks/${id}`),
  updateTruck: (id, data) => axios.put(`${BASE_URL}/api/trucks/${id}`, data),
  deleteTruck: (id) => axios.delete(`${BASE_URL}/api/trucks/${id}`),

  // Truck Types
  getAllTruckTypes: () => axios.get(`${BASE_URL}/api/truck_types`),
  createTruckType: (data) => axios.post(`${BASE_URL}/api/truck_types`, data),
  getTruckTypeById: (id) => axios.get(`${BASE_URL}/api/truck_types/${id}`),
  updateTruckType: (id, data) =>
    axios.put(`${BASE_URL}/api/truck_types/${id}`, data),
  deleteTruckType: (id) => axios.delete(`${BASE_URL}/api/truck_types/${id}`),

  // Customers
  getAllCustomers: () => axios.get(`${BASE_URL}/api/customers`),
  createCustomer: (data) => axios.post(`${BASE_URL}/api/customers`, data),
  getCustomerById: (id) => axios.get(`${BASE_URL}/api/customer/${id}`),
  updateCustomer: (id, data) =>
    axios.put(`${BASE_URL}/api/customer/${id}`, data),
  deleteCustomer: (id) => axios.delete(`${BASE_URL}/api/customer/${id}`),

  // Destinations
  getAllDestinations: () => axios.get(`${BASE_URL}/api/destinations`),
  createDestination: (data) => axios.post(`${BASE_URL}/api/destinations`, data),
  getDestinationById: (id) => axios.get(`${BASE_URL}/api/destinations/${id}`),
  updateDestination: (id, data) =>
    axios.put(`${BASE_URL}/api/destinations/${id}`, data),
  deleteDestination: (id) => axios.delete(`${BASE_URL}/api/destinations/${id}`),

  // Categories
  getAllCategories: () => axios.get(`${BASE_URL}/api/categories`),
  getCategoryById: (id) => axios.get(`${BASE_URL}/api/categories/${id}`),
  getFilteredCategories: (queryParams) =>
    axios.get(`${BASE_URL}/api/categories/filter`, { params: queryParams }),
  createCategory: (data) => axios.post(`${BASE_URL}/api/categories`, data),
  updateCategory: (id, data) =>
    axios.put(`${BASE_URL}/api/categories/${id}`, data),
  deleteCategory: (id) => axios.delete(`${BASE_URL}/api/categories/${id}`),

  // SubContractors
  getAllSubCons: () => axios.get(`${BASE_URL}/api/subcons`),
  createSubCon: (data) => axios.post(`${BASE_URL}/api/subcons`, data),
  getSubConById: (id) => axios.get(`${BASE_URL}/api/subcons/${id}`),
  updateSubCon: (id, data) => axios.put(`${BASE_URL}/api/subcons/${id}`, data),
  deleteSubCon: (id) => axios.delete(`${BASE_URL}/api/subcons/${id}`),

  // Transactions
  // getAllTransactions: () => axios.get(`${BASE_URL}/api/transactions`),
  // getTransactionById: (id) => axios.get(`${BASE_URL}/api/transactions/${id}`),
  // addTransaction: (data) => axios.post(`${BASE_URL}/api/transactions`, data),
  // updateTransaction: (id, data) =>
  //   axios.put(`${BASE_URL}/api/transactions/${id}`, data),
  // deleteTransaction: (id) => axios.delete(`${BASE_URL}/api/transactions/${id}`),

  getAllTransactions: () => axios.get(`${BASE_URL}/api/transactions`),
  getTransactionsByNumbers: (numbers) =>
    axios.post(`${BASE_URL}/api/transactions/bynumbers`, {
      transactionNumbers: numbers,
    }),

  getSortedTransactions: () => axios.get(`${BASE_URL}/api/transactions/sort`),

  getFilteredTransactions: (queryParams) =>
    axios.get(`${BASE_URL}/api/transactions/filter`, { params: queryParams }),
  getTransactionById: (id) => axios.get(`${BASE_URL}/api/transactions/${id}`),
  addTransaction: (data) => axios.post(`${BASE_URL}/api/transactions`, data),
  updateTransaction: (id, data) =>
    axios.put(`${BASE_URL}/api/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${BASE_URL}/api/transactions/${id}`),

  // Billing Summaries

  getAllBillingSummaries: () => axios.get(`${BASE_URL}/api/billing_summary`),
  getBillingSummaryDashboardData: (queryParams) =>
    axios.get(`${BASE_URL}/api/billing_summary/dashboard`, {
      params: queryParams,
    }),
  getSortedBillingSummary: () =>
    axios.get(`${BASE_URL}/api/billing_summary/sort`),
  getFilteredBillingSummary: (queryParams) =>
    axios.get(`${BASE_URL}/api/billing_summary/filter`, {
      params: queryParams,
    }),
  getBillingSummaryById: (id) =>
    axios.get(`${BASE_URL}/api/billing_summary/${id}`),
  addBillingSummary: (data) =>
    axios.post(`${BASE_URL}/api/billing_summary`, data),
  updateBillingSummary: (id, data) =>
    axios.put(`${BASE_URL}/api/billing_summary/${id}`, data),
  deleteBillingSummary: (id) =>
    axios.delete(`${BASE_URL}/api/billing_summary/${id}`),

  // Supplier Billings
  getAllSupplierBillings: () => axios.get(`${BASE_URL}/api/supplier_billing`),
  getSupplierBillingDashboardData: () =>
    axios.get(`${BASE_URL}/api/supplier_billing/dashboard`),
  getSortedSupplierBilling: () =>
    axios.get(`${BASE_URL}/api/supplier_billing/sort`),
  getFilteredSupplierBilling: (queryParams) =>
    axios.get(`${BASE_URL}/api/supplier_billing/filter`, {
      params: queryParams,
    }),
  getSupplierBillingById: (id) =>
    axios.get(`${BASE_URL}/api/supplier_billing/${id}`),
  addSupplierBilling: (data) =>
    axios.post(`${BASE_URL}/api/supplier_billing`, data),
  updateSupplierBilling: (id, data) =>
    axios.put(`${BASE_URL}/api/supplier_billing/${id}`, data),
  deleteSupplierBilling: (id) =>
    axios.delete(`${BASE_URL}/api/supplier_billing/${id}`),
};

export default apiService;
