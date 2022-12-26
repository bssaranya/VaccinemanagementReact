import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LoginModal from './LoginModal';
import { logout } from '../../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// styled components
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  &:hover {
    color: white;
    text-decoration: none;
    border-bottom: 3px solid #cb3066;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: large;
  font-weight: 700;
  &:hover {
    color: white;
  }
`;

const NavBar = () => {
  const [show, setShow] = useState(false);
  const { islogin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // function for open and close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="navigationbar">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>
              <Logo to="/">
                <i className="fa-solid fa-virus fs-2 text-danger"></i> COVID 19
              </Logo>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {islogin ? (
              <>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto ">
                    <NavLink to="/admin-dashboard">Dashboard</NavLink>
                    <NavLink to="/person-listing">User</NavLink>
                    <NavLink to="/vaccine-listing">Vaccination</NavLink>
                    <NavLink to="/report">Reports</NavLink>
                    <NavLink to="/change-password">Change Password</NavLink>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Brand
                  className="btn btn-outline-danger text-white"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Navbar.Brand>
              </>
            ) : (
              <Navbar.Brand
                className="btn btn-outline-danger"
                onClick={handleShow}
              >
                Login
              </Navbar.Brand>
            )}
          </Container>
        </Navbar>
      </div>
      <LoginModal handleClose={handleClose} show={show} />
    </>
  );
};

export default NavBar;
