import { useState } from "react";
import axios from "axios";

const RegisterStaff = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store the uploaded image URL

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile && firstName && lastName) {
      // Concatenate first name, last name, and file name to create a new file name
      const newFileName = `${firstName.toLowerCase()}${lastName}.${selectedFile.name
        .split(".")
        .pop()}`;
      // Remove spaces from the new file name
      const sanitizedFileName = newFileName.replace(/\s/g, "");

      // Rename the file here
      const renamedFile = new File([selectedFile], sanitizedFileName, {
        type: selectedFile.type,
      });

      const formData = new FormData();
      formData.append("file", renamedFile);

      try {
        const response = await axios.post(
          "http://localhost:4000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        // Update state with the uploaded image URL
        setUploadedImageUrl(response.data.imageUrl);
        // console.log(response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("Missing required data");
    }
  };

  return (
    <div>
      <form encType="multipart/form-data">
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </form>
      {uploadedImageUrl && ( // Display the image if URL is available
        <div>
          <h2>Uploaded Image:</h2>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default RegisterStaff;
