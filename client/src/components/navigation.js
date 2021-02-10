import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

import { Link } from "react-router-dom";

import MyAccount from '../auth/myAccount';


function Navigation(props) {

  return (
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Sensors Data
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              {/* <Nav>
                <Link to={"/add-sensor"} className="nav-link">
                  Add Sensor
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/sensors-list"} className="nav-link">
                  Sensors List
                </Link>
              </Nav>

              <Nav>
                <MyAccount userLoggedIn={props.userLoggedIn}/>
              </Nav>

            </Nav>

          </Container>
        </Navbar>
      </header>
  );
}

export default Navigation;
