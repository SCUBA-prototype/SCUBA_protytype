import React from "react";
import { PADITableOne } from "/imports/api/PADI/PADITableOne";
import { PADITableTwo } from "/imports/api/PADI/PADITableTwo";
import { PADITableThree } from "/imports/api/PADI/PADITableThree";
import { Grid, Header, Container, Form, Loader, Card, Modal, Button, Icon, Image } from "semantic-ui-react";
import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Session } from "meteor/session";
import { PADI_PGI } from "/imports/api/PADI/PADI_PGI";

const _ = require("underscore");

/** Renders the Page for adding a document. */
class AddDiveAdmin extends React.Component {
    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props) {
        super(props);
        let items = [ this.Card ]
        this.state = {
            pgi: "",
            ipgi: "",
            time: "",
            plannedSI: "",
            pressureGroup1: "",
            pressureGroup2: "",
            RNT: "",
            actualBT: "",
            totalBT: "",
            dropdownOne: [],
            dropdownTwo: [],
            dropdownThree: [],
            dropdownFour: [],
            dropdownFive: [],
            submitDisable: true,

        };
        this.insertCallback = this.insertCallback.bind(this);
        this.updateState = this.updateState.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.submitDive = this.submitDive.bind(this);
        this.submitSI = this.submitSI.bind(this);
        this.dropdownOne = this.dropdownOne.bind(this);
        this.dropdownTwo = this.dropdownTwo.bind(this);
        this.dropdownThree = this.dropdownThree.bind(this);
        this.dropdownFour = this.dropdownFour.bind(this);
        this.dropdownFive = this.dropdownFive.bind(this);
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
        const pgi = Session.get("pgi");
        const pressureGroup1 = this.props.PGI[pgi][depth];
        Session.set("pressureGroup1", pressureGroup1);
        const actualBT = Session.get("actualBT");
        const totalBT = +pressureGroup1 + +actualBT;
        Session.set("totalBT", totalBT);
        const pressureGroup2 = this.props.one[depth][totalBT];
        Session.set("pressureGroup2", pressureGroup2);
        this.clear();
    }

    submitSI() {
        const plannedSI = Session.get("plannedSI");
        const ipgi = Session.get("ipgi");
        const fpressure = this.props.two[ipgi][plannedSI];
        Session.set("fpressure", fpressure);
        this.clear();
    }

    clear() {
        this.setState({
            pgi: "",
            ipgi: "",
            time: "",
            plannedSI: "",
            pressureGroup1: "",
            pressureGroup2: "",
            RNT: "",
            actualBT: "",
            totalBT: "",
            dropdownOne: [],
            dropdownTwo: [],
            dropdownThree: [],
            dropdownFour: [],
            submitDisable: true
        });
    }

// ---------------------------------- Total Bottom Time ----------------------------------------
    dropdownOne() {
        let i = -1;
        const dropdownOne = _.map(
            _.without(_.keys(this.props.three), "_id"),
            function (val) {
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

    dropdownTwo() {
        let i = -1;
        const dropdownTwo = _.map(
            _.keys(this.props.three[this.state.pgi]),
            function (val) {
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

    dropdownFive() {
        let i = -1;
        const dropdownFive= _.map(
            _.keys(this.props.one[this.state.depth]),
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
            dropdownFive: dropdownFive
        });
    }
// ---------------------------------- Surface Interval ----------------------------------------
    dropdownThree() {
        let i = -1;
        const dropdownThree = _.map(
            _.without(_.keys(this.props.two), "_id"),
            function (val) {
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

    dropdownFour() {
        let i = -1;
        const dropdownFour = _.map(
            _.keys(this.props.two[this.state.ipgi]),
            function (val) {
                i++;
                return {
                    key: i,
                    text: val,
                    value: val
                };
            }
        );
        this.setState({
            dropdownFour: dropdownFour
        });
    }

    renderComponent() {
        const divStyle = { paddingBottom: '50px', paddingTop: '50px' };
        Session.setDefault("pgi", "");
        Session.setDefault("ipgi", "");
        Session.setDefault("depth", "");
        Session.setDefault("pressureGroup1", "");
        Session.setDefault("pressureGroup2", "");
        Session.setDefault("plannedSI", "");
        Session.setDefault("RNT", "");
        Session.setDefault("actualBT", "");
        Session.setDefault("totalBT", "");
        return (
            <Card.Group className="card-group" >
                <Card className="initial-dive-card">
                    <Header style={{ padding: 10 }} as="h2" textAlign="center">
                        React Recreational Dive Table
                    </Header>
                    <Card.Meta>
                        <span className='date'>Enter parameters for your initial dive</span>
                    </Card.Meta>
                    <Container style={{ padding: 20 }}>
                        <Form>
                            <h2 style={{ fontSize: 14 }}>Starting Pressure Group</h2>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={this.state.dropdownOne}
                                name={"pgi"}
                                value={this.state.pgi}
                                onChange={this.updateState}
                                onClick={this.dropdownOne}
                                placeholder={"Select Initial Pressure Group"}
                                style={{ minWidth: 150 }}
                            />
                            <h2 style={{ fontSize: 14 }}>Planned Diving depth</h2>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={this.state.dropdownTwo}
                                name={"depth"}
                                value={this.state.depth}
                                onChange={this.updateState}
                                onClick={this.dropdownTwo}
                                placeholder={"Select Depth in Meters"}
                                style={{ minWidth: 150 }}
                            />
                            <h2 style={{ fontSize: 14 }}>Planned Diving Time</h2>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={this.state.dropdownFive}
                                name={"actualBT"}
                                value={this.state.actualBT}
                                onChange={this.updateState}
                                onClick={this.dropdownFive}
                                placeholder={"Select Time in Minutes"}
                                style={{ minWidth: 150 }}
                            />
                        </Form>
                        <Form style={divStyle}>
                            <Button
                                floated="center"
                                color="blue"
                                inverted
                                onClick={this.submitDive}
                            > Submit </Button>
                            <Button
                                onClick={this.clear}
                                floated="center"
                                color="red"
                                inverted> Reset
                            </Button>
                        </Form>
                    </Container>
                </Card>
                <Card style={{ padding: 20 }}>
                    <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>Your Initial Dive</Header>
                    <Card.Meta>
                        <span>The results of your dive based on your input parameters.</span>
                    </Card.Meta>
                    <h4> Starting Pressure Group: {Session.get("pgi")} </h4>
                    <h4>Depth: {Session.get("depth")}</h4>
                    <h4>Residual Nitrogen Time: {Session.get("pressureGroup1")}</h4>
                    <h4>Actual Bottom Time: {Session.get("actualBT")}</h4>
                    <h4>Total Bottom Time: {Session.get("totalBT")}</h4>
                    <h4>Final Pressure Group: {Session.get("pressureGroup2")}</h4>
                    <i>Note: If Final Pressure Group does not show anything, it means that you have exceeded the max Actual
                        Bottom Time entered and you will need to go lower.</i>
                </Card>
                <Card>
                    <Container style={{ padding: 20 }}>
                        <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>Add Another Dive</Header>
                        <Card.Meta>
                            <span style={{ paddingBottom: 25 }}>Use this feature for adding multiple dives to the same day.</span>
                        </Card.Meta>
                        <Form style={{ marginTop: 25 }}>
                            <h2 style={{ fontSize: 14 }}>Initial Pressure Group</h2>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={this.state.dropdownThree}
                                name={"ipgi"}
                                value={this.state.ipgi}
                                onChange={this.updateState}
                                onClick={this.dropdownThree}
                                placeholder={"Select Initial Pressure Group"}
                                style={{ minWidth: 150 }}
                            />
                            <h2 style={{ fontSize: 14 }}>Planned Surface Interval</h2>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={this.state.dropdownFour}
                                name={"plannedSI"}
                                value={this.state.plannedSI}
                                onChange={this.updateState}
                                onClick={this.dropdownFour}
                                placeholder={"Surface Interval"}
                                style={{ minWidth: 150 }}
                            />
                        </Form>
                        <Form style={divStyle}>
                            <Button
                                floated="center"
                                color="blue"
                                inverted
                                onClick={this.submitSI}
                            > Submit </Button>
                            <Button
                                onClick={this.clear}
                                floated="center"
                                color="red"
                                inverted> Reset
                            </Button>
                        </Form>
                    </Container>
                </Card>
                <Card style={{ padding: 20 }}>
                    <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>Your Next Dive</Header>
                    <Card.Meta>
                        <span>The results of your next dive based on your next dives input parameters.</span>
                    </Card.Meta>
                    <h4>Starting Pressure Group: {Session.get("ipgi")} </h4>
                    <h4>Surface Interval: {Session.get("plannedSI")}</h4>
                    <h4>Final Pressure Group: {Session.get("fpressure")}</h4>
                </Card>
            </Card.Group>


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
    one: PropTypes.object,
    two: PropTypes.object,
    three: PropTypes.object,
    PGI: PropTypes.object,
    ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
    const subscription = Meteor.subscribe("PADITableOne");
    const subscription2 = Meteor.subscribe("PADITableTwo");
    const subscription3 = Meteor.subscribe("PADITableThree");
    const subscription4 = Meteor.subscribe("PADI_PGI");

    let tableOne = {};
    let tableTwo = {};
    let tableThree = {};
    let tablePGI = {};
    if (
        subscription.ready() &&
        subscription2.ready() &&
        subscription3.ready() &&
        subscription4.ready()
    ) {
        tableOne = PADITableOne.find({}).fetch();
        tableTwo = PADITableTwo.find({}).fetch();
        tableThree = PADITableThree.find({}).fetch();
        tablePGI = PADI_PGI.find({}).fetch();
    }

    return {
        // Returns the entire array, [0] since we want the object
        one: tableOne[0],
        two: tableTwo[0],
        three: tableThree[0],
        PGI: tablePGI[0],
        ready:
            subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
    };
})(AddDiveAdmin);