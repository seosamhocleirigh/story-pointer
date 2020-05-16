import React, { Component } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Form } from 'react-bootstrap'

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');
        const hubConnection = new HubConnectionBuilder().withUrl('/chat').build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    };

    sendMessage = () => {
        this.state.hubConnection
            .invoke('sendToAll', this.state.nick, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="formSendMessage">
                    <Form.Control type="text" placeholder="Ticket number/subject" value={this.state.message} onChange={e => this.setState({ message: e.target.value })} />
                </Form.Group>

                <div>
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block' }} key={index}> {message} </span>
                    ))}
                </div>
            </Form>);
    }
}