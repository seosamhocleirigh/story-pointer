import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.scss';

// import Chat from './Components/Chat'
import Header from './Components/Header'

function App() {
  return (
      <Container bg="dark" className="App page-container">
        <Row>
          <Header />
        </Row>
      </Container>
  );
}

export default App;
