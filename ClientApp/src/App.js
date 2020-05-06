import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.scss';

// import Chat from './Components/Chat'
import Login from './Components/Login'
import Poker from './Components/Poker'

function App() {
  return (
    <Router>
        
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" >story_pointer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem eventkey={1} href="/login">
              <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            </NavItem>
            <NavItem eventkey={2} href="/poker">
              <Nav.Link as={Link} to="/poker" >Poker</Nav.Link>
            </NavItem>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path='/'>
            <div>home</div>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/poker'>
            <Poker />
          </Route>
          <Route render={function () {
            return <p>Not found</p>
          }} />
      </Switch>

    </Router>
  );
}

export default App;
