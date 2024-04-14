//1. import the createContext and useContext  hooks from React

import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

const initialState = {
  user: storedUser,
  isAuthenticated: storedAuth,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "login_failed":
      return {
        ...state,
        user: null,
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
    user: storedUser,
    isAuthenticated: storedAuth,
  });

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Logout the user before unloading the page
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

  async function login(username, password) {
    console.log(`login in authprovider receiveds username${username}`);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        },
      );
      console.log(response);
      const user = response.data;
      console.log(`user ${JSON.stringify(user.email)}`);

      dispatch({ type: "login", payload: { user } });
      // // Persist user information in localStorage
      localStorage.setItem("user", JSON.stringify(user));
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
