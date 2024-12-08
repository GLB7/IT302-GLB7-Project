// Giovani Bergamasco
// 12/8/2024
// IT 302 451
// Phase 5 CUD Node.js Data using React.js
// glb7@njit.edu
import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import RobohashesList from "./components/robohashesList";
import Robohash from "./components/robohash";
import Login from "./components/login";
import AddComment from "./components/addComment";

function App() {
  const [user, setUser] = useState(null);
  const loginSetter = useCallback(
    (user) => {
      setUser(user);
    },
    [setUser]
  );

  const logout = () => {
    setUser(null);
  };

  const PrivateRoute = ({ user, children }) => { // I personally added this to avoid non logged in users to access the AddComment page by changing the URL
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Robohash Center</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/robohashes"}>
              Robohashes
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "/" : "/login"} onClick={user ? logout : null}>
              {user ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        {/* Default Route*/}
        <Route path="/" element={<Navigate to="/robohashes" />} />

        {/* Route to display all Robohashes */}
        <Route path="/robohashes" element={<RobohashesList />} />

        {/* Route to display a single Robohash */}
        <Route path="/robohashes/:id" element={<Robohash user={user} />} />

        {/* Route to create comment */}
        <Route path="/robohashes/:id/comment" element={
          <PrivateRoute user={user}>
            <AddComment user={user} />
          </PrivateRoute>
        } />

        {/* Login Page */}
        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />} />
      </Routes>
    </div>
  );
}

export default App;
