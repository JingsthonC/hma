// SelectorComponent.jsx

const SelectorComponentIndexBase = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="">
      <form className="">
        <label
          htmlFor="selectorOptions"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <select
          id="selectorOptions"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={selectedValue}
          onChange={handleOptionChange}
        >
          <option value={label} disabled>
            {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SelectorComponentIndexBase;
