import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PokerSubject from '../Components/PokerSubject'
import VotingPanel from '../Components/VotingPanel'
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
                        <PokerSubject />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <VotingPanel />
                    </Col>
                </Row>
            </Container>
        );
    };
}