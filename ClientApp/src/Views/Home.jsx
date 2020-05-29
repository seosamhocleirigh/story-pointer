import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as colors from '../Styles/Colors.scss';

export default class Home extends Component {

    render() {
        return (
            <Container>
                <Row>&nbsp;</Row>
                <Row>
                    <h3 style={{ color: colors.puce }}>Create or join a poker session</h3>
                </Row>

                <Row style={{ color: colors.brandy }}>
                    <div>
                        <h4>Running sessions:</h4>
                    </div>
                </Row>
            </Container>
        );
    };
}