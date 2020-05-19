import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

class PokerSubject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokerSubject: '',
            hubConnection: null,
        };
    }

    sendMessage = (pokerSubject) => {
        this.state.hubConnection
            .invoke('updatePokerSubject', this.props.userName, pokerSubject)
            .catch(err => console.error(err));
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="formSendMessage">
                    <Form.Control type="text" placeholder="Ticket number/subject" value={this.state.pokerSubject} onChange={e => this.sendMessage(e.target.value)} />
                </Form.Group>
            </Form>);
    }
}

const mapStateToProps = state => ({ userName: state.login.userName });

export default connect(mapStateToProps)(PokerSubject);