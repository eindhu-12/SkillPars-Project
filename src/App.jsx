import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Router } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import About from "./Components/About/About";
import Demo from "./Components/DemoRegistration/Demo";


function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        {/* <Route path="/courses" el`ement={<Abut />}/>
        <Route path="/services" el`ement={<About />}/> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />}/>
      </Routes>
       <ToastContainer/>
    </Router>

    
  );
}

export default App;
