import { useState, useRef, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const PairDataRow = ({
  label1,
  label2,
  fieldName1,
  fieldName2,
  onFormattedDataChange,
}) => {
  const [items, setItems] = useState([{ [fieldName1]: "", [fieldName2]: "" }]);
  const [isRowEligible, setIsRowEligible] = useState(false);
  const lastInputRef1 = useRef(null);
  const lastInputRef2 = useRef(null);

  useEffect(() => {
    if (lastInputRef1.current) {
      lastInputRef1.current.focus();
    }

    // Trigger the formatted data change whenever items change
    updateFormattedData();
  }, [items]);

  const updateFormattedData = () => {
    const formattedData = items.map((item) => ({
      transaction_sales_invoice_number: item[fieldName1].split(",").map(Number),
      transaction_sales_invoice_qty: item[fieldName2].split(",").map(Number),
    }));
    onFormattedDataChange && onFormattedDataChange(formattedData);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    // Check if both fields are filled in the current row
    if (updatedItems[index][fieldName1] && updatedItems[index][fieldName2]) {
      setIsRowEligible(true);
    } else {
      setIsRowEligible(false);
    }
  };

  const handleKeyDown = (index, field, event) => {
    if ((event.key === "Tab" || event.key === "Enter") && isRowEligible) {
      // Add a new row when Tab or Enter is pressed and both fields are filled
      setItems([...items, { [fieldName1]: "", [fieldName2]: "" }]);
      setIsRowEligible(false); // Reset eligibility for the new row
    }
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    // Add a new row when the "Add" button is clicked
    setItems([...items, { [fieldName1]: "", [fieldName2]: "" }]);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">{label1}</th>
            <th className="border px-4 py-2">{label2}</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item[fieldName1]}
                  onChange={(e) =>
                    handleInputChange(index, fieldName1, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, fieldName1, e)}
                  ref={
                    index === items.length - 1 && fieldName1 === "fieldName1"
                      ? lastInputRef1
                      : null
                  }
                  className="w-full rounded-md border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item[fieldName2]}
                  onChange={(e) =>
                    handleInputChange(index, fieldName2, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, fieldName2, e)}
                  ref={
                    index === items.length - 1 && fieldName2 === "fieldName2"
                      ? lastInputRef2
                      : null
                  }
                  className="w-full rounded-md border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </td>
              <td className="border px-4 py-2">
                {index === items.length - 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="text-green-600 hover:text-green-700"
                    >
                      <FaPlus />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PairDataRow;
