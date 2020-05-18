import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { userLogin } from '../Actions/loginActions'

import * as colors from '../Styles/Colors.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
        };
    }

    onLoginFieldChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault(0);
        this.props.userLogin(this.state.userName);
        // TODO: direct user to poker page
    }

    render () {
        return (
            <Container>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formLogin">
                            <h3 style={{ color: colors.puce }}>Login</h3>
                            <Form.Control type="text" placeholder="Enter name" onChange={this.onLoginFieldChange} />
                            <Form.Text className="text-muted">
                                Enter your name or an alias
                            </Form.Text>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: userName => dispatch(userLogin(userName))
    };
}

export default connect(null, mapDispatchToProps)(Login);