import React from "react";
import {withCookies} from 'react-cookie';
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
import Login from "./auth/login";
import Navigation from './components/navigation';
import ProtectedRoute from './components/protectedRoute'
import axios from "axios";


function App(props) {

  const userLoggedIn = props.allCookies.userLoggedIn;
  return (<Router>
    <div className="App">
      <Navigation userLoggedIn={userLoggedIn}/>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={View} />
                <Route exact path="/edit-sensor/:id" component={EditSensor} />
                <Route exact path="/sensors-list"  render={() => (<SensorsList userLoggedIn={props.allCookies.userLoggedIn}/>)} />
                <Route exact path="/login" component={Login} />
                {/* <Route exact path="/login"
                 component={() => <Login onLoginSuccess={handleLogin} />} /> */}
                {/* <Route exact path="/add-sensor" component={AddSensor} /> */}
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default withCookies(App);
