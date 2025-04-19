import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TopAppBar.css";

const TopAppBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="top-navbar">
      <Container className="d-flex align-items-center justify-content-start">
        {/* Logo only */}
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center logo-clickable me-4"
        >
          <img
            src="/images/stars_talent_agency_logo.png"
            alt="Logo"
            height="40"
            className="d-inline-block align-middle"
          />
        </Navbar.Brand>

        {/* Home link */}
        <span
          className="nav-link text-white"
          style={{ cursor: "pointer", marginBottom: 0 }}
          onClick={() => navigate("/home")}
        >
          Home
        </span>
      </Container>
    </Navbar>
  );
};

export default TopAppBar;
