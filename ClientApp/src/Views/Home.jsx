import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Container, Row, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { createGroup, listGroups } from '../Actions/connectedUsersActions';
import * as colors from '../Styles/Colors.scss';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            groupName: ''
        }

        this.props.getGroupList();
    }

    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });
    handleGroupNameChange = (event) => this.setState({ groupName: event.target.value });
    handleCreateGroup = (event) => {
        event.preventDefault(0);
        this.props.createGroup(this.state.groupName);
        this.setState({ showModal: false });
        this.props.history.push('/login');
    };

    render() {

        return (
            <Container>
                <Row>&nbsp;</Row>
                <Row>
                    <h3 style={{ color: colors.puce }}>Create or join a poker session</h3>
                </Row>
                <Row style={{ color: colors.brandy }}>
                    <div>
                        <h4>Currently running sessions:</h4>
                        {this.props.groupsList.length > 0 ?
                            this.props.groupsList.map((group, index) => (
                            <div>{group}</div>
                            )) :
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>}
                    </div>
                </Row>
                <Row>&nbsp;</Row>
                <Row>&nbsp;</Row>
                <Row>
                    <Button variant="primary" onClick={this.handleShow}>
                        Create poker group
                    </Button>

                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create a poker group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" placeholder="Group name"
                                    onChange={this.handleGroupNameChange} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.handleCreateGroup}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
                
            </Container>
        );
    };
}

function mapStateToProps(state) {
    return {
        groupsList: state.groups.groupsList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getGroupList: () => dispatch(listGroups()),
        createGroup: groupName => dispatch(createGroup(groupName))
    };
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default withRouter(connectedHome);