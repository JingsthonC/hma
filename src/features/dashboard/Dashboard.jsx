import apiService from "../../services/apiService";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const response = await apiService.getAllTransactions();
    const data = response.data;
    const transactions = data.map((item) => ({ ...item, key: item.id }));
    return transactions; // Update the state with the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default function Dashboard() {
  const transactions = useLoaderData();

  const dashboardData = transactions[0]?.dashboardData;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
      {dashboardData ? (
        <>
          <DashboardCard
            title="Total Transactions"
            value={dashboardData.total_transactions}
          />
          <DashboardCard
            title="Not Yet Processed"
            value={dashboardData.not_yet_processed_count}
          />
          <DashboardCard
            title="With Billing Summary"
            value={dashboardData.with_billing_summary_count}
          />
          <DashboardCard
            title="Billed Transactions"
            value={dashboardData.billed_count}
          />
          <DashboardCard
            title="Total Receivables"
            value={dashboardData.total_net_payable}
          />
          <DashboardCard
            title="Total Amount Payable"
            value={dashboardData.total_amount_payable}
          />
          <DashboardCard title="Profit" value={dashboardData.difference} />
        </>
      ) : (
        <div className="col-span-4 flex items-center justify-center text-xl font-bold text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}

const DashboardCard = ({ title, value }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <div className="mt-2 text-4xl font-bold text-indigo-600">{value}</div>
    </div>
  );
};
