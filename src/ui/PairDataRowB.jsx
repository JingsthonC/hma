/* eslint-disable react-hooks/exhaustive-deps */
// PairDataRow.jsx
import { useState, useRef, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const PairDataRowB = ({
  label1,
  label2,
  fieldName3,
  fieldName4,
  onFormattedDataChange,
  initialData = [],
}) => {
  // const [items, setItems] = useState([{ [fieldName3]: "", [fieldName4]: "" }]);
  const [items, setItems] = useState(initialData);
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

  // const updateFormattedData = () => {
  //   const formattedData = items.map((item) => ({
  //     transaction_deduction_amount: item[fieldName3].split(",").map(Number),
  //     transaction_deduction_remarks: item[fieldName4].split(","),
  //   }));
  //   onFormattedDataChange && onFormattedDataChange(formattedData);
  // };

  const updateFormattedData = () => {
    const formattedData = items.map((item) => {
      // Check if item[fieldName3] exists and is a string before splitting
      const deductionAmount =
        item[fieldName3] && typeof item[fieldName3] === "string"
          ? item[fieldName3].split(",").map(Number)
          : [];

      // Check if item[fieldName4] exists and is a string before splitting
      const deductionRemarks =
        item[fieldName4] && typeof item[fieldName4] === "string"
          ? item[fieldName4].split(",")
          : [];

      return {
        transaction_deduction_amount: deductionAmount,
        transaction_deduction_remarks: deductionRemarks,
      };
    });
    onFormattedDataChange && onFormattedDataChange(formattedData);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    // Check if both fields are filled in the current row
    if (updatedItems[index][fieldName3] && updatedItems[index][fieldName4]) {
      setIsRowEligible(true);
    } else {
      setIsRowEligible(false);
    }
  };

  const handleKeyDown = (index, field, event) => {
    if ((event.key === "Tab" || event.key === "Enter") && isRowEligible) {
      // Add a new row when Tab or Enter is pressed and both fields are filled
      setItems([...items, { [fieldName3]: "", [fieldName4]: "" }]);
      setIsRowEligible(false); // Reset eligibility for the new row
    }
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    // Add a new row when the "Add" button is clicked
    setItems([...items, { [fieldName3]: "", [fieldName4]: "" }]);
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
                  value={item[fieldName3] || 0}
                  onChange={(e) =>
                    handleInputChange(index, fieldName3, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, fieldName3, e)}
                  ref={
                    index === items.length - 1 && fieldName3 === "fieldName3"
                      ? lastInputRef1
                      : null
                  }
                  className="w-full rounded-md border-gray-300 bg-white px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item[fieldName4] || "no remarks"}
                  onChange={(e) =>
                    handleInputChange(index, fieldName4, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, fieldName4, e)}
                  ref={
                    index === items.length - 1 && fieldName4 === "fieldName4"
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

export default PairDataRowB;
