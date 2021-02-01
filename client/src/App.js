import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import AddSensor from "./components/addSensor";
import EditSensor from "./components/editSensor";
import SensorsList from "./components/sensorsList";
import View from "./components/view";
import Login from "./components/login";
import ProtectedRoute from './components/protectedRoute'

const handleLogin = async(prop) => {
       
       console.log(prop)
    
}

function App() {
  return (<Router>
    <div className="App">
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
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </Nav>

            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={View} />
                <Route exact path="/edit-sensor/:id" component={EditSensor} />
                <ProtectedRoute exact path="/sensors-list" component={SensorsList} />
                {/* <Route exact path="/login" component={Login} /> */}
                <Route exact path="/login"
                 component={() => <Login onLoginSuccess={handleLogin} />} />
                {/* <Route exact path="/add-sensor" component={AddSensor} /> */}
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App