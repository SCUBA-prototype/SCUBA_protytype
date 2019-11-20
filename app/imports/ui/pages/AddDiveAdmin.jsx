import React from "react";
import { PADITableOne } from "/imports/api/PADI/PADITableOne";
import { PADITableTwo } from "/imports/api/PADI/PADITableTwo";
import { PADITableThree } from "/imports/api/PADI/PADITableThree";
import { Grid, Header, Container, Form, Loader, Modal, Button, Icon, Image } from "semantic-ui-react";
import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Session } from "meteor/session";

const _ = require("underscore");

/** Renders the Page for adding a document. */
class AddDiveAdmin extends React.Component {
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props) {
        super(props);
        this.state = {
            depth: "",
            time: "",
            PGI:"",
            pressureGroup1: "",
            pressureGroup2: "",
            plannedSI: "",
            RNT: "",
            actualBT: "",
            totalBT: "",
            dropdownOne: [],
            dropdownTwo: [],
            dropdownThree: [],
            residual: ""
        };

        this.insertCallback = this.insertCallback.bind(this);
        this.updateState = this.updateState.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.submitDive = this.submitDive.bind(this);
        this.dropdownOne = this.dropdownOne.bind(this);
        this.dropdownTwo = this.dropdownTwo.bind(this);
        this.dropdownThree = this.dropdownThree.bind(this);
        this.clear = this.clear.bind(this);
    }

    /** Notify the user of the results of the submit. If successful, clear the form. */
    insertCallback(error) {
        if (error) {
            Bert.alert({ type: "danger", message: `Add failed: ${error.message}` });
        } else {
            Bert.alert({ type: "success", message: "Add succeeded" });
        }
    }

    updateState(e, { name, value }) {
        this.setState({ [name]: value });
        Session.set(name, value);
    }

    /** On submit, insert the data. */
    submitDive() {
        const depth = Session.get("depth");
        const pressureGroup1 = Session.get("pressureGroup1");
        const plannedSI = Session.get("plannedSI");
        const pressureGroup2 = this.props.two[pressureGroup1][plannedSI];
        const arr = this.props.three[pressureGroup2][depth];
        Session.set("pressureGroup2", pressureGroup2);
        if (arr.length === 2) {
            const RNT = arr[0];
            const actualBT = arr[1];
            const totalBT = RNT + actualBT;
            Session.set("RNT", RNT);
            Session.set("actualBT", actualBT);
            Session.set("totalBT", totalBT);
        } else {
            const RNT = arr[0];
            const actualBT = 0;
            const totalBT = RNT + actualBT;
            Session.set("RNT", RNT);
            Session.set("actualBT", actualBT);
            Session.set("totalBT", totalBT);
        }
        const dive = {
            depth: Session.get("depth"),
            time: Session.get("time"),
            pressureGroup1: Session.get("pressureGroup1"),
            pressureGroup2: Session.get("pressureGroup2"),
            plannedSI: Session.get("plannedSI"),
            RNT: Session.get("RNT"),
            actualBT: Session.get("actualBT"),
            totalBT: Session.get("totalBT")
        };
        this.clear();
    }

    clear() {
        this.setState({
            depth: "",
            time: "",
            pressureGroup1: "",
            pressureGroup2: "",
            plannedSI: "",
            RNT: "",
            actualBT: "",
            totalBT: "",
            dropdownOne: [],
            dropdownTwo: [],
            dropdownThree: []
        });
    }

    dropdownOne() { //Pressure Group
        let i = -1;
        const dropdownOne = _.map(
            _.without(_.keys(this.props.one), "_id"),
            function(val) {
                i++;
                return {
                    key: i,
                    text: val,
                    value: val
                };
            }
        );
        this.setState({
            dropdownOne: dropdownOne
        });
    }

    dropdownTwo() { //
        let i = -1;
        const dropdownTwo = _.map(
            _.without(_.keys(this.props.one[this.state.depth]), "_id"),
            function(val) {
                i++;
                return {
                    key: i,
                    text: val,
                    value: val
                };
            }
        );
        this.setState({
            dropdownTwo: dropdownTwo
        });
    }

    dropdownThree() {
        const depth = Session.get("depth");
        const time = Session.get("time");
        const pressureGroup1 = this.props.one[depth][time];
        Session.set("pressureGroup1", pressureGroup1);
        let i = -1;
        const dropdownThree = _.map(
            _.keys(this.props.one[pressureGroup1]),
            function(val) {
                i++;
                return {
                    key: i,
                    text: val,
                    value: val
                };
            }
        );
        this.setState({
            dropdownThree: dropdownThree
        });
    }

    renderComponent() {
        const divStyle = { paddingBottom: '50px', paddingTop: '50px' };
        Session.setDefault("depth", "");
        Session.setDefault("time", "");
        Session.setDefault("pressureGroup1", "");
        Session.setDefault("pressureGroup2", "");
        Session.setDefault("plannedSI", "");
        Session.setDefault("RNT", "");
        Session.setDefault("actualBT", "");
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        Add Dive
                    </Header>
                    <h2 style={{ fontSize: 14 }}>Initial Pressure Group</h2>
                    <Container style={{ paddingLeft: 20 }}>
                        <Form>
                                <Form.Dropdown
                                    fluid
                                    search
                                    selection
                                    options={this.state.dropdownOne}
                                    name={"depth"}
                                    value={this.state.PGI}
                                    onChange={this.updateState}
                                    onClick={this.dropdownOne}
                                    placeholder={"Select Depth (in feet)"}
                                    style={{ minWidth: 150 }}
                                />
                            <h2 style={{ fontSize: 14 }}>Planned Depth</h2>
                                <Form.Dropdown
                                    fluid
                                    search
                                    selection
                                    options={this.state.dropdownTwo}
                                    name={"time"}
                                    value={this.state.depth}
                                    onChange={this.updateState}
                                    onClick={this.dropdownTwo}
                                    placeholder={"Select Depth"}
                                    style={{ minWidth: 150 }}
                                />
                                <h2 style={{ fontSize: 14 }}>Planned Surface Interval</h2>
                                <Form.Dropdown
                                    fluid
                                    search
                                    selection
                                    placeholder={"Select Time"}
                                    options={this.state.dropdownThree}
                                    name={"Diving Time"}
                                    value={this.state.time}
                                    onChange={this.updateState}
                                    onClick={this.dropdownThree}
                                    style={{ minWidth: 150 }}
                                />
                        </Form>
                        <Form style={divStyle}>
                            <Button
                                floated="right"
                                color="blue"
                                inverted
                                onClick={this.submitDive}
                            > Submit </Button>
                            <Button
                                onClick={this.clear}
                                floated="right"
                                color="red"
                                inverted > Reset
                            </Button>
                        </Form>
                    </Container>
                    <Grid.Row style={divStyle}>
                        <p>Depth: {Session.get("depth")}</p>
                        <p>Time: {Session.get("time")}</p>
                        <p>Pressure Group: {Session.get("pressureGroup")}</p>
                        <p>Surface Interval: {Session.get("plannedSI")}</p>
                        <p>Residual Nitrogen Time: {Session.get("RNT")}</p>
                        <p>Actual Bottom Time: {Session.get("actualBT")}</p>
                        <p>Total Bottom Time: {Session.get("totalBT")}</p>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return this.props.ready ? (
            this.renderComponent()
        ) : (
            <Loader active>Getting data</Loader>
        );
    }
}

AddDiveAdmin.propTypes = {
    one: PropTypes.object.isRequired,
    two: PropTypes.object.isRequired,
    three: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
    const subscription = Meteor.subscribe("PADITableOne");
    const subscription2 = Meteor.subscribe("PADITableTwo");
    const subscription3 = Meteor.subscribe("PADITableThree");

    let tableOne = {};
    let tableTwo = {};
    let tableThree = {};
    if (
        subscription.ready() &&
        subscription2.ready() &&
        subscription3.ready()
    ) {
        tableOne = PADITableOne.find({}).fetch();
        tableTwo = PADITableTwo.find({}).fetch();
        tableThree = PADITableThree.find({}).fetch();
    }

    return {
        // Returns the entire array, [0] since we want the object
        three: tableOne[0],
        two: tableTwo[0],
        one: tableThree[0],
        ready:
            subscription.ready() && subscription2.ready() && subscription3.ready()
    };
})(AddDiveAdmin);
