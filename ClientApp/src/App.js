import React from 'react';
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './Styles/App.scss';
import * as colors from './Styles/Colors.scss';

import Home from './Views/Home';
import Login from './Views/Login';
import Poker from './Views/Poker';

function App() {
  
  return (
    <Router>
        
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" style={{ color: colors.white }}>&lt;story_pointer /&gt;</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem eventkey={1} href="/login">
                <Nav.Link style={{ color: colors.bayLeaf }} as={Link} to="/login" >Login</Nav.Link>
            </NavItem>
            <NavItem eventkey={2} href="/poker">
                <Nav.Link style={{ color: colors.bayLeaf }} as={Link} to="/poker" >Poker</Nav.Link>
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
            <Home />
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
