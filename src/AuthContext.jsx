//1. import the createContext and useContext  hooks from React

import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

const initialState = {
  staff: storedUser,
  isAuthenticated: storedAuth,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, staff: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, staff: null, isAuthenticated: false };
    case "login_failed":
      return {
        ...state,
        staff: null,
        isAuthenticated: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    staff: storedUser,
    isAuthenticated: storedAuth,
  });

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Logout the staff before unloading the page
  //     logout();
  //     // Cancel the event
  //     event.preventDefault();
  //     // Chrome requires returnValue to be set
  //     event.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // async function login(staffname, password) {
  //   console.log(
  //     `login in authprovider receiveds username${username}, ${password}`,
  //   );
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/api/sign-in",
  //       {
  //         username,
  //         password,
  //       },
  //       {
  //         withCredentials: true, // Include credentials in the request
  //       },
  //     );
  //     console.log(response);
  //     const staff = response.data;
  //     console.log(`user ${JSON.stringify(staff.staff_email)}`);

  //     dispatch({ type: "login", payload: { staff } });
  //     // // Persist user information in localStorage
  //     localStorage.setItem("user", JSON.stringify(staff));
  //     localStorage.setItem("isAuthenticated", JSON.stringify(true));
  //   } catch (error) {
  //     dispatch({
  //       type: "login_failed",
  //       payload: { error: "Invalid credentials" },
  //     });
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/sign-in",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        },
      );

      const {
        status,
        role,
        email,
        staff_first_name,
        staff_last_name,
        apiKey,
        staff_avatar_url,
      } = response.data;

      // Dispatch action to update state
      dispatch({
        type: "login",
        payload: {
          staff: {
            email,
            staff_first_name,
            staff_last_name,
            apiKey,
            staff_avatar_url,
          },
        },
      });

      // Persist user information in localStorage
      localStorage.setItem(
        "staff",
        JSON.stringify({
          email,
          staff_first_name,
          staff_last_name,
          apiKey,
          staff_avatar_url,
        }),
      );
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
    } catch (error) {
      dispatch({
        type: "login_failed",
        payload: { error: "Invalid credentials" },
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    console.log(`loggedout is pressed`);
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
    localStorage.removeItem("isAuthenticated");
  }
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useContext  must be used within a Provider");
  return context;
}

export { AuthProvider, useAuth };
