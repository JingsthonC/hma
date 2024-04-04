//extract unique properties
export function extractUniqueProperties(filteredTransactions, propertyName) {
  const propertyValuesSet = new Set();
  filteredTransactions.slice().forEach((item) => {
    propertyValuesSet.add(item[propertyName]);
  });

  const uniqueProperties = Array.from(propertyValuesSet).map(
    (value, index) => ({
      id: index, // You can assign a unique ID if needed
      value: value,
      label: value,
    }),
  );
  return uniqueProperties;
}

export function extractUniqueID(value, propertyName, referenceArray) {
  const propertyId =
    referenceArray.find((obj) => obj[propertyName] === value)?.id ?? null;
  return propertyId;
}
