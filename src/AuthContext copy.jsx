// AuthContext.js
import { createContext, useContext, useReducer } from "react";

//1. Create the context
const AuthContext = createContext(); //Make sure to import the useContext from react

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true, // Updated property name
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false, // Updated property name
        error: action.payload.error,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false, // Updated property name
        error: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children, isAuthenticated }) => {
  const initialState = {
    user: null,
    isAuthenticated: isAuthenticated, // Updated property name
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //2. Wrap the children that will be subscribe to the data
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
//AuthProvider is the custom provider
//useAuth is the custom hook
