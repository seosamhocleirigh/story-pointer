import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Container, Row,  Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setUserName } from '../Actions/connectedUsersActions';
import * as colors from '../Styles/Colors.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enteredUserName: null,
        };
    }

    onLoginFieldChange = (event) => {
        this.setState({
            enteredUserName: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault(0);
        this.props.userLogin(this.state.enteredUserName);
        this.props.history.push('/poker');
    }

    render() {
        const { currentUser } = this.props.connectedUsers.users;

        return (
            <Container>
                <Row>&nbsp;</Row>
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formLogin">
                            <h3 style={{ color: colors.puce }}>Login</h3>
                            <Form.Control type="text" placeholder={currentUser !== undefined ? currentUser.userName : ''} onChange={this.onLoginFieldChange} />
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

const mapStateToProps = state => ({ connectedUsers: state.connectedUsers });

function mapDispatchToProps(dispatch) {
    return {
        userLogin: userName => dispatch(setUserName(userName))
    };
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(connectedLogin);
