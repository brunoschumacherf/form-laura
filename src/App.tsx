import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Form } from "./components/Form";
import { Dashboard } from "./components/Dashboard";
import { ThankYou } from "./components/ThankYou";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
