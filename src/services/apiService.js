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
  getAllAccounts: () => axios.get(`${BASE_URL}/api/accounts`),
  getAccountById: (id) => axios.get(`${BASE_URL}/api/accounts/${id}`),
  updateAccount: (id, data) =>
    axios.put(`${BASE_URL}/api/accounts/${id}`, data),
  deleteAccount: (id) => axios.delete(`${BASE_URL}/api/accounts/${id}`),

  // Trucks
  getAllTrucks: () => axios.get(`${BASE_URL}/api/trucks`),
  getTruckById: (id) => axios.get(`${BASE_URL}/api/truck/${id}`),
  updateTruck: (id, data) => axios.put(`${BASE_URL}/api/truck/${id}`, data),
  deleteTruck: (id) => axios.delete(`${BASE_URL}/api/truck/${id}`),

  // Truck Types
  getAllTruckTypes: () => axios.get(`${BASE_URL}/api/truck_types`),
  getTruckTypeById: (id) => axios.get(`${BASE_URL}/api/truck_types/${id}`),
  updateTruckType: (id, data) =>
    axios.put(`${BASE_URL}/api/truck_types/${id}`, data),
  deleteTruckType: (id) => axios.delete(`${BASE_URL}/api/truck_types/${id}`),

  // Customers
  getAllCustomers: () => axios.get(`${BASE_URL}/api/customers`),
  getCustomerById: (id) => axios.get(`${BASE_URL}/api/customer/${id}`),
  updateCustomer: (id, data) =>
    axios.put(`${BASE_URL}/api/customer/${id}`, data),
  deleteCustomer: (id) => axios.delete(`${BASE_URL}/api/customer/${id}`),

  // Destinations
  getAllDestinations: () => axios.get(`${BASE_URL}/api/destinations`),
  getDestinationById: (id) => axios.get(`${BASE_URL}/api/destination/${id}`),
  updateDestination: (id, data) =>
    axios.put(`${BASE_URL}/api/destination/${id}`, data),
  deleteDestination: (id) => axios.delete(`${BASE_URL}/api/destination/${id}`),

  // Categories
  getAllCategories: () => axios.get(`${BASE_URL}/api/categories`),
  getCategoryById: (id) => axios.get(`${BASE_URL}/api/category/${id}`),
  updateCategory: (id, data) =>
    axios.put(`${BASE_URL}/api/category/${id}`, data),
  deleteCategory: (id) => axios.delete(`${BASE_URL}/api/category/${id}`),

  // Transactions
  getAllTransactions: () => axios.get(`${BASE_URL}/api/transactions`),
  getTransactionById: (id) => axios.get(`${BASE_URL}/api/transactions/${id}`),
  addTransaction: (data) => axios.post(`${BASE_URL}/api/transactions`, data),
  updateTransaction: (id, data) =>
    axios.put(`${BASE_URL}/api/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`${BASE_URL}/api/transactions/${id}`),

  // Billing Summaries
  getAllBillingSummaries: () => axios.get(`${BASE_URL}/api/billing_summary`),
  getBillingSummaryById: (id) =>
    axios.get(`${BASE_URL}/api/billing_summary/${id}`),
  addBillingSummary: (data) =>
    axios.post(`${BASE_URL}/api/billing_summary`, data),
  updateBillingSummary: (id, data) =>
    axios.put(`${BASE_URL}/api/billing_summary/${id}`, data),
  deleteBillingSummary: (id) =>
    axios.delete(`${BASE_URL}/api/billing_summary/${id}`),

  // Supplier Billings
  getAllSupplierBillings: () => axios.get(`${BASE_URL}/api/supplier_billings`),
  getSupplierBillingById: (id) =>
    axios.get(`${BASE_URL}/api/supplier_billing/${id}`),
  addSupplierBilling: (data) =>
    axios.post(`${BASE_URL}/api/create_supplier_billing`, data),
  updateSupplierBilling: (id, data) =>
    axios.put(`${BASE_URL}/api/supplier_billing/${id}`, data),
  deleteSupplierBilling: (id) =>
    axios.delete(`${BASE_URL}/api/supplier_billing/${id}`),
};

export default apiService;
