const TextInput = ({ label, id, placeholder, value, onChange, darkMode }) => {
  const inputClass = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${darkMode ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : ""}`;

  const handleInputChange = (event) => {
    // Capture the input value and call the provided onChange callback
    onChange && onChange(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
