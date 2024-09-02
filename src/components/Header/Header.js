import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { PiSignOutBold, PiUserSquareBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const hanldeLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="wrapper">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">QuizApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} className="nav-link">
                Home
              </NavLink>
              <NavLink to={"/user"} className="nav-link">
                User
              </NavLink>
              <NavLink to={"/admin"} className="nav-link">
                Admin
              </NavLink>
            </Nav>
            <Nav className="wrapper-login">
              {!isAuthenticated ? (
                <>
                  <button
                    className="btn btn-outline-primary"
                    onClick={hanldeLogin}
                  >
                    Log in
                  </button>
                  <button className="btn btn-dark" onClick={handleRegister}>
                    Sign up
                  </button>
                </>
              ) : (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <PiUserSquareBold />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <PiSignOutBold />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
