import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from '../Components/Chat'
import * as colors from '../Styles/Colors.scss'

export default class Poker extends Component {

    render () {
        return (
            <Container style={{ backgroundColor: colors.shark }}>
                <Row>
                    <Col>
                        <h2 style={{ color: colors.portage }}>Story Poker</h2>
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