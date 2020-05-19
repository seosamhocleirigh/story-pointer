import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as colors from '../Styles/Colors.scss';

class VotingPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            votes: [],
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

            this.state.hubConnection.on('sendVoteToAll', (receivedVote) => {
                
                const votes = this.state.votes.concat([receivedVote]);
                this.setState({ votes });
                
            });
        });
    };

    sendMessage = (vote) => {
        
        this.state.hubConnection
            .invoke('sendVoteToAll', { "Name": this.props.userName, "Vote": vote })
            .catch(err => console.error(err));

    };

    render() {
        const fibonacciSeries = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

        return (
            <Container>
                <Row>
                    <h3 style={{ color: colors.puce }}>Vote</h3>
                </Row>
                <Row>
                    <Col></Col>
                    {fibonacciSeries.map((number) =>
                        <Col>
                            <Button style={{ cursor: "pointer" }} key={'vote-' + number}
                                onClick={this.sendMessage.bind(null, number)}
                                variant="primary">{number}</Button>
                        </Col>)
                    }
                    <Col></Col>
                </Row>
                <Row style={{ color: '#CCC' }}>
                    <div>
                        {this.state.votes.map((vote, index) => (
                            <span style={{ display: 'block' }} key={index}>{vote.name} - {vote.vote} </span>
                        ))}
                    </div>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ userName: state.login.userName });

export default connect(mapStateToProps)(VotingPanel);