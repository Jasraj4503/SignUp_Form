import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Layout/Signup";
import Login from "./Layout/login";
import Dashboard from "./Layout/Dashboard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "./assets/Style.css"

function App() {
  const isLoggedIn = localStorage.getItem("loggedInUser");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
