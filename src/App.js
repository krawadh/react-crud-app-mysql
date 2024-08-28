import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/PageNotFound";
import ModalProvider from "./context/ModalContext";
import AuthProvider from "./context/AuthContext";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // useEffect(() => {
  //   // check for token in LS
  //   if (localStorage.token) {
  //     //setAuthToken(localStorage.token);
  //   }
  //   //store.dispatch(loadUser());

  //   // log user out from all tabs if they log out in one tab
  //   window.addEventListener("storage", () => {
  //     if (!localStorage.token) dispatch({ type: LOGOUT });
  //   });
  // }, []);
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
