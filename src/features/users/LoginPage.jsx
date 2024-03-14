import React, { useState } from "react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registrationData, setRegistrationData] = useState({
    role: "",
    email: "",
    password: "",
    staff_id: "",
    status: "active",
  });

  const handleLogin = async () => {
    try {
      // Implement login logic using the loginData state
      console.log("Logging in with:", loginData);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegistration = async () => {
    try {
      // Implement registration logic using the registrationData state
      console.log("Registering with:", registrationData);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>

      {/* Login Section */}
      <div>
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>

      {/* Registration Section */}
      <div>
        <h2>Registration</h2>
        <label>
          Role:
          <input
            type="text"
            value={registrationData.role}
            onChange={(e) =>
              setRegistrationData({ ...registrationData, role: e.target.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={registrationData.email}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
          />
        </label>
        <label>
          Staff ID:
          <input
            type="number"
            value={registrationData.staff_id}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                staff_id: e.target.value,
              })
            }
          />
        </label>
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
