import { useState } from "react";
import apiService from "../../services/apiService";

const StaffForm = () => {
  const [formData, setFormData] = useState({
    // staff_first_name: "Alice",
    // staff_middle_name: "Marie",
    // staff_last_name: "Smith",
    // staff_name_ext: "Sr.",
    // staff_email: "alice.smith@example.com",
    // staff_contact_number: "+1987654321",
    // staff_address_street: "456 Elm Street",
    // staff_address_city: "Smallville",
    // staff_address_province: "State",
    // staff_address_zip_code: "54321",
    // staff_birthday: "1985-12-25",
    // staff_position: "Manager",
    // staff_password: "password456",
    // file: null,
    // staff_employment_status: "regular",
    // staff_first_name: "John",
    // staff_middle_name: "Catal",
    // staff_last_name: "Doe",
    // staff_name_ext: "Jr.",
    // staff_email: "john.doe@example.com",
    // staff_contact_number: "+1234567890",
    // staff_address_street: "123 Main Street",
    // staff_address_city: "Anytown",
    // staff_address_province: "State",
    // staff_address_zip_code: "12345",
    // staff_birthday: "1990-01-01",
    // staff_position: "Developer",
    // staff_password: "password123",
    // file: null,
    // staff_employment_status: "contractual",
    staff_first_name: "Michael",
    staff_middle_name: "David",
    staff_last_name: "Johnson",
    staff_name_ext: "",
    staff_email: "michael.johnson@example.com",
    staff_contact_number: "+11234567890",
    staff_address_street: "789 Oak Avenue",
    staff_address_city: "Metropolis",
    staff_address_province: "State",
    staff_address_zip_code: "67890",
    staff_birthday: "1985-05-15",
    staff_position: "Engineer",
    staff_password: "password123",
    file: null,
    staff_employment_status: "contractual",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.staff_first_name.trim()) {
      errors.staff_first_name = "First name is required";
    }
    if (!formData.staff_last_name.trim()) {
      errors.staff_last_name = "Last name is required";
    }
    if (!formData.staff_email.trim()) {
      errors.staff_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.staff_email)) {
      errors.staff_email = "Invalid email address";
    }
    if (!formData.staff_contact_number.trim()) {
      errors.staff_contact_number = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.staff_contact_number)) {
      errors.staff_contact_number = "Invalid contact number";
    }
    if (!formData.staff_address_street.trim()) {
      errors.staff_address_street = "Street address is required";
    }
    if (!formData.staff_address_city.trim()) {
      errors.staff_address_city = "City is required";
    }
    if (!formData.staff_address_province.trim()) {
      errors.staff_address_province = "Province is required";
    }
    if (!formData.staff_address_zip_code.trim()) {
      errors.staff_address_zip_code = "Zip code is required";
    } else if (!/^\d{4}$/.test(formData.staff_address_zip_code)) {
      errors.staff_address_zip_code = "Invalid zip code";
    }
    if (!formData.staff_birthday) {
      errors.staff_birthday = "Birthday is required";
    }
    if (!formData.staff_position.trim()) {
      errors.staff_position = "Position is required";
    }
    // Add validations for the remaining fields
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("staff_first_name", formData.staff_first_name);
    data.append("staff_middle_name", formData.staff_middle_name);
    data.append("staff_last_name", formData.staff_last_name);
    data.append("staff_name_ext", formData.staff_name_ext);
    data.append("staff_email", formData.staff_email);
    data.append("staff_contact_number", formData.staff_contact_number);
    data.append("staff_address_street", formData.staff_address_street);
    data.append("staff_address_city", formData.staff_address_city);
    data.append("staff_address_province", formData.staff_address_province);
    data.append("staff_address_zip_code", formData.staff_address_zip_code);
    data.append("staff_birthday", formData.staff_birthday);
    data.append("staff_position", formData.staff_position);
    data.append("staff_password", formData.staff_password);
    data.append("staff_employment_status", formData.staff_employment_status);
    data.append("file", formData.file);

    // console.log("clicked!");
    // console.log("formData", formData);
    // console.log("data", data); // Check this log to see if data is populated correctly
    try {
      const response = await apiService.registerStaff(data);
      console.log("res", response);
      if (response.status === 200) {
        alert("Staffs Creation successful");
      } else {
        alert("Staffs Creation");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && formData.staff_first_name && formData.staff_last_name) {
      // Concatenate first name, last name, and file name to create a new file name
      const newFileName = `${formData.staff_first_name.toLowerCase()}${formData.staff_last_name}.${selectedFile.name.split(".").pop()}`;
      // Remove spaces from the new file name
      const sanitizedFileName = newFileName.replace(/\s/g, "");

      // Rename the file here
      const renamedFile = new File([selectedFile], sanitizedFileName, {
        type: selectedFile.type,
      });

      // Update the state with the renamed file
      setFormData({ ...formData, file: renamedFile });
    } else {
      // If any of the required data is missing, set the file in the state without renaming
      setFormData({ ...formData, file: selectedFile });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-5 mx-auto max-w-md"
      encType="multipart/form-data"
    >
      <InputWithLabel
        type="email"
        name="staff_email"
        id="staff_email"
        placeholder="Email address"
        required
        value={formData.staff_email}
        onChange={handleChange}
      />
      {errors.staff_email && (
        <p className="text-red-500">{errors.staff_email}</p>
      )}
      <InputWithLabel
        type="password"
        name="staff_password"
        id="staff_password"
        placeholder="Password"
        required
        value={formData.staff_password}
        onChange={handleChange}
      />
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputWithLabel
          type="text"
          name="staff_first_name"
          id="staff_first_name"
          placeholder="First Name"
          required
          value={formData.staff_first_name}
          onChange={handleChange}
        />
        {errors.staff_first_name && (
          <p className="text-red-500">{errors.staff_first_name}</p>
        )}
        <InputWithLabel
          type="text"
          name="staff_middle_name"
          id="staff_middle_name"
          placeholder="Middle Name"
          required
          value={formData.staff_middle_name}
          onChange={handleChange}
        />
        {errors.staff_middle_name && (
          <p className="text-red-500">{errors.staff_middle_name}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputWithLabel
          type="text"
          name="staff_last_name"
          id="staff_last_name"
          placeholder="Last Name"
          required
          value={formData.staff_last_name}
          onChange={handleChange}
        />
        {errors.staff_last_name && (
          <p className="text-red-500">{errors.staff_last_name}</p>
        )}
        <InputWithLabel
          type="text"
          name="staff_name_ext"
          id="staff_name_ext"
          placeholder="Name Extension"
          // required
          value={formData.staff_name_ext}
          onChange={handleChange}
        />
        {/* {errors.staff_name_ext && (
          <p className="text-red-500">{errors.staff_name_ext}</p>
        )} */}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputWithLabel
          type="tel"
          name="staff_contact_number"
          id="staff_contact_number"
          placeholder="Phone"
          required
          value={formData.staff_contact_number}
          onChange={handleChange}
        />
        {errors.staff_first_name && (
          <p className="text-red-500">{errors.staff_first_name}</p>
        )}
        <InputWithLabel
          type="date"
          name="staff_birthday"
          id="staff_birthday"
          placeholder="Birthday"
          required
          value={formData.staff_birthday}
          onChange={handleChange}
        />
      </div>
      ADDRESS
      <br />
      <br />
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputWithLabel
          type="text"
          name="staff_address_street"
          id="staff_address_street"
          placeholder="Street"
          required
          value={formData.staff_address_street}
          onChange={handleChange}
        />
        <InputWithLabel
          type="text"
          name="staff_address_city"
          id="staff_address_city"
          placeholder="City"
          required
          value={formData.staff_address_city}
          onChange={handleChange}
        />
        <InputWithLabel
          type="text"
          name="staff_address_province"
          id="staff_address_province"
          placeholder="Province"
          required
          value={formData.staff_address_province}
          onChange={handleChange}
        />
        <InputWithLabel
          type="text"
          name="staff_address_zip_code"
          id="staff_address_zip_code"
          placeholder="Zip Code"
          required
          value={formData.staff_address_zip_code}
          onChange={handleChange}
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputWithLabel
          type="text"
          name="staff_position"
          id="staff_position"
          placeholder="Position"
          required
          value={formData.staff_position}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="staff_avatar_url" className="block font-semibold">
          Avatar
        </label>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="staff_employment_status"
          className="block font-semibold"
        >
          Employment Status
        </label>
        <select
          id="staff_employment_status"
          name="staff_employment_status"
          value={formData.staff_employment_status}
          onChange={handleChange}
          className="rounded border border-gray-300 px-4 py-2"
        >
          <option value="contractual">Contractual</option>
          <option value="regular">Regular</option>
          <option value="awol">AWOL</option>
          <option value="separated">Separated</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default StaffForm;

export function InputWithLabel({
  type,
  name,
  id,
  placeholder,
  required,
  value,
  onChange,
}) {
  return (
    <div className="group relative z-0 mb-5 w-full">
      <input
        type={type}
        name={name}
        id={id}
        placeholder=""
        required={required}
        value={value}
        onChange={onChange}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
      />
      <label
        htmlFor={id}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
      >
        {placeholder}
      </label>
    </div>
  );
}
