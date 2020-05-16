import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from '../Components/Chat'

export default class Poker extends Component {

    render () {
        return (
            <Container style={{ backgroundColor: '#282c34' }}>
                <Row>
                    <Col>
                        <h2 style={{ color: '#7b87e8'}}>Story Poker</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Chat />
                    </Col>
                </Row>
            </Container>
        );
    };
}