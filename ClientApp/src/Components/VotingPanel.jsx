import React, { Component } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { castVote, clearVotes, showVotes } from '../Actions/connectedUsersActions';
import * as colors from '../Styles/Colors.scss';

class VotingPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            connectedUsers: [],
        };
    }

    handleCastVote = (vote) => {
        this.props.signRCastVote(vote);
    };

    handleClearVotes = () => {
        this.props.sigRClearVotes();
    };

    handleShowVotes = () => {
        this.props.sigRShowVotes();
    };

    render() {
        const fibonacciSeries = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

        function RenderConnectedUserVotes(props) {
            if (props.connectedUsers && props.connectedUsers.length > 0) {
                return props.connectedUsers.map((connectedUser, index) => (
                    <span style={{ display: 'block', fontSize: 'x-large' }} key={index}>
                        {connectedUser.userName} 
                        {connectedUser.showVote ? " - " + connectedUser.vote : (connectedUser.vote !== null ? " - has voted" : "")}
                    </span>
                ));
            } else {
                return (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                );
            }
        }

        return (
            <Container>
                <Row>&nbsp;</Row>
                <Row>
                    <h3 style={{ color: colors.portage }}>Vote</h3>
                </Row>
                <Row>
                    <Col></Col>
                    {/* TODO: change buttons for cards */}
                    {fibonacciSeries.map((number) =>
                        <Col>
                            <Button style={{ cursor: "pointer" }} key={'vote-' + number}
                                onClick={this.handleCastVote.bind(null, number)}
                                variant="primary">{number}</Button>
                        </Col>)
                    }
                    <Col></Col>
                </Row>
                <Row className='mt-5'>
                    <Col></Col>
                    <Col>
                        <Button variant="danger" onClick={this.handleClearVotes}>Clear votes</Button>
                        <Button variant="outline-info" onClick={this.handleShowVotes}>Show votes</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='mt-5' style={{ color: colors.portage }}>
                    <h3>Voters</h3>
                </Row>
                <Row style={{ color: colors.brandy }}>
                    <div>
                        <RenderConnectedUserVotes connectedUsers={this.props.connectedUsers} showVotes={this.props.showVotes} />
                    </div>
                </Row>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        connectedUsers: state.connectedUsers.users,
        showVotes: state.connectedUsers.showVotes,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        signRCastVote: vote => dispatch(castVote(vote)),
        sigRClearVotes: () => dispatch(clearVotes()),
        sigRShowVotes: () => dispatch(showVotes()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPanel);