import { FaPlus, FaTrash } from "react-icons/fa";

export default function PairInput({ value1, value2, onChange }) {
  function handlefieldInput1Change(event) {
    onChange && onChange([event.target.value, value2]);
  }

  function handlefieldInput2Change(event) {
    onChange && onChange([value1, event.target.value]);
  }

  return (
    <div className="mx-auto my-8 max-w-md">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Header 1</th>
            <th className="border-b px-4 py-2">Header 2</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">
              <input
                className="w-full rounded border p-2"
                type="text"
                value={value1}
                onChange={handlefieldInput1Change}
              />
            </td>
            <td className="border-b px-4 py-2">
              <input
                className="w-full rounded border p-2"
                type="text"
                onChange={handlefieldInput2Change}
                value={value2}
              />
            </td>
            <td className="border-b px-4 py-2">
              <button
                className="rounded bg-blue-500 px-2 py-1 text-white"
                onClick={() => {}}
                disabled={false}
              >
                <FaPlus />
              </button>

              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {}}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
