const TextArea = ({ label, value, onChange }) => {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange && onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="remarks"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id="remarks"
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={`Write your ${label.toLowerCase()} here...`}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextArea;
