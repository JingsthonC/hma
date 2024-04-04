import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TransactionTable({
  transactions,
  setDataLoaded,
  checkBoxstate,
}) {
  const [showCheckBox, setShowCheckBox] = useState(false);

  useEffect(() => {
    setShowCheckBox(checkBoxstate || false);
  }, []);

  const handleCheckboxChange = (index) => {
    const newTransactions = [...transactions];
    if (newTransactions[index].checked) {
      newTransactions[index].checked = !newTransactions[index].checked;
      setDataLoaded((prevChecked) =>
        prevChecked.filter(
          (num) => num !== newTransactions[index].transaction_number,
        ),
      );
    } else {
      newTransactions[index].checked = !newTransactions[index].checked;
      setDataLoaded((prevChecked) => [
        ...prevChecked,
        newTransactions[index].transaction_number,
      ]);
    }
  };

  const handleSelectAllChange = () => {
    const allChecked = transactions.every((transaction) => transaction.checked);
    const newTransactions = transactions.map((transaction) => ({
      ...transaction,
      checked: !allChecked,
    }));
    setDataLoaded(newTransactions);
  };
  return (
    <div className="">
      <div className="flex justify-between px-5">
        <h2 className="mb-4 text-2xl font-semibold">Transaction Data List</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {showCheckBox && (
              <th>
                <input
                  id="header-checkbox"
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="header-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Select All
                </label>
              </th>
            )}

            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Transaction Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Destination Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Plate Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Truck Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Shipment Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Trip Ticket Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.transaction_number}
              className="hover:bg-gray-100"
            >
              {showCheckBox && (
                <td className="content-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={transaction.checked || false}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                  </div>
                </td>
              )}

              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  to={`${transaction.transaction_number}/edit`}
                  className="text-blue-500 hover:underline"
                >
                  {transaction.transaction_number}
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_date}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.customer_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.destination_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.truck_plate}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.truck_type_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_shipment_number}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_trip_ticket_number}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {transaction.transaction_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
