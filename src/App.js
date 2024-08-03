//import logo from "./logo.svg";
import "./App.css";

//components
import "./components/NavBar";
import NavBar from "./components/NavBar";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
