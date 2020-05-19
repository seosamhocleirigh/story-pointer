import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { castVote, clearVotes } from '../Actions/connectedUsersActions';
import * as colors from '../Styles/Colors.scss';

class VotingPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            votes: [],
            connectedUsers: [],
            showVotes: false,
        };
    }

    castVote = (vote) => {
        this.props.castVote(vote);
    };

    clearVotes = () => {
        this.props.clearVotes();
    };

    render() {
        const fibonacciSeries = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];
        const { connectedUsers } = this.props.connectedUsers.users;

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
                                onClick={this.castVote.bind(null, number)}
                                variant="primary">{number}</Button>
                        </Col>)
                    }
                    <Col></Col>
                </Row>
                <Row className='mt-5'>
                    <Col></Col>
                    <Col>
                        <Button variant="danger" onClick={this.clearVotes}>Clear votes</Button>
                        <Button variant="outline-info" onClick={() => this.setState({ showVotes: true })}>Show votes</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-5' style={{ color: colors.puce }}>
                    <h3>Voters</h3>
                </Row>
                <Row style={{ color: colors.brandy }}>
                    <div>
                        {connectedUsers.map((connectedUser, index) => (
                            <span style={{ display: 'block' }} key={index}>{connectedUser.userName} {this.state.showVotes ? "- " + connectedUser.vote : connectedUser.vote !== null ? "- has voted" : ""}</span>
                        ))}
                    </div>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ connectedUsers: state.connectedUsers });

function mapDispatchToProps(dispatch) {
    return {
        castVote: vote => dispatch(castVote(vote)),
        clearVotes: dispatch(clearVotes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPanel);