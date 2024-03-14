/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

const MutatingSingleColumn = ({ label, fieldName, onFormattedDataChange }) => {
  const [items, setItems] = useState([{ [fieldName]: "" }]);
  const [isRowEligible, setIsRowEligible] = useState(false);
  const lastInputRef = useRef(null);

  // useEffect(() => {
  //   if (lastInputRef.current) {
  //     lastInputRef.current.focus();
  //   }
  //   updateFormattedData();
  // }, [items]);

  // const updateFormattedData = () => {
  //   const formattedData = items.map((item) => ({
  //     transaction_delivery_receipt_number: item[fieldName]
  //       .split(",")
  //       .map(Number),
  //   }));
  //   onFormattedDataChange && onFormattedDataChange(formattedData);
  // };

  useEffect(() => {
    updateFormattedData();
  }, [items]);

  const updateFormattedData = () => {
    const formattedData = items.map((item) => ({
      transaction_delivery_receipt_number: item[fieldName]
        .split(",")
        .map(Number),
    }));
    onFormattedDataChange && onFormattedDataChange(formattedData);
  };

  // const updateFormattedData = () => {
  //   const formattedData = items.map((item) => ({
  //     transaction_delivery_receipt_number: item[fieldName]
  //       .split(",")
  //       .map(Number),
  //   }));
  //   onFormattedDataChange && onFormattedDataChange(formattedData);
  // };

  // useEffect(() => {
  //   if (lastInputRef.current) {
  //     lastInputRef.current.focus();
  //   }
  //   updateFormattedData();
  // }, [items, updateFormattedData]); // Include updateFormattedData in the dependency array

  const handleInputChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index][fieldName] = value;
    setItems(updatedItems);

    // Check if the field is filled in the current row
    if (updatedItems[index][fieldName]) {
      setIsRowEligible(true);
    } else {
      setIsRowEligible(false);
    }
  };

  const handleKeyDown = (index, event) => {
    if ((event.key === "Tab" || event.key === "Enter") && isRowEligible) {
      // Add a new row when Tab or Enter is pressed and the field is filled
      setItems([...items, { [fieldName]: "" }]);
      setIsRowEligible(false); // Reset eligibility for the new row
    }
  };

  const handleDeleteRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAddRow = () => {
    // Add a new row when the "Add" button is clicked
    setItems([...items, { [fieldName]: "" }]);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
              {label}
            </th>
            <th className="border border-gray-300 bg-gray-100 px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={item[fieldName]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={index === items.length - 1 ? lastInputRef : null}
                  className="w-full rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {index === items.length - 1 ? (
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="mr-2 rounded bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none"
                    >
                      <FaPlus />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      className="rounded bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(index)}
                    className="rounded bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none"
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

export default MutatingSingleColumn;
