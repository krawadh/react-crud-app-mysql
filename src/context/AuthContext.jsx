// AuthContext.js
import React, { createContext, useContext, useReducer } from "react";
import { login as loginApi } from "../services/api";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was use outside the AuthProvider.");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(data) {
    try {
      const response = await loginApi(data);
      console.log(response);
      dispatch({ type: "login", payload: response.data.user });
      if (response.data.token) {
        // Store token in local storage
        localStorage.setItem("token", response.data.token);
      } else {
        //setError("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
