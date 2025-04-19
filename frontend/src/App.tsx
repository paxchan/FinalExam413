import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import EntertainerDetails from "./pages/EntertainerDetails";
import AddEntertainer from "./pages/AddEntertainer";
import EditEntertainer from "./pages/EditEntertainer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/entertainers/:id" element={<EntertainerDetails />} />
          <Route path="/entertainers/add" element={<AddEntertainer />} />
          <Route path="/entertainers/edit/:id" element={<EditEntertainer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
