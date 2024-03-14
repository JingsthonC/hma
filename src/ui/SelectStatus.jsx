import { useState, useEffect } from "react";

const SelectStatus = ({ onStatusChange, selectedStatus }) => {
  const [selectedValue, setSelectedValue] = useState(selectedStatus);

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onStatusChange(newValue);
  };

  useEffect(() => {
    // console.log("Initial Status:", selectedValue);
  }, [selectedValue]); // Log the initial value whenever it changes

  return (
    <div>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="not_yet_processed">Not yet processed</option>
        <option value="with_billing_summary">On process</option>
        <option value="billed">Billed</option>
      </select>
    </div>
  );
};

export default SelectStatus;
