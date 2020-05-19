import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import { HubConnectionBuilder } from '@microsoft/signalr';

class PokerSubject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokerSubject: '',
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const { userName } = this.props;
        const hubConnection = new HubConnectionBuilder().withUrl('/vote').build();

        this.setState({ hubConnection, userName }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('updatePokerSubject', (userName, receivedMessage) => {
                this.setState({ pokerSubject: receivedMessage });
            });
        });
    };

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