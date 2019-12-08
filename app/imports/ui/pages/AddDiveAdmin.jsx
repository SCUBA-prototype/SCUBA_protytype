import React from "react";
import { PADITableOne } from "/imports/api/PADI/PADITableOne";
import { PADITableTwo } from "/imports/api/PADI/PADITableTwo";
import { PADITableThree } from "/imports/api/PADI/PADITableThree";
import { Header, Container, Form, Loader, Card, Button, Grid, Image } from "semantic-ui-react";
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
    let items = [this.Card];
    this.state = {
      dives: [],
      pai: 0,
      newRow: false,
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
    this.planAnother = this.planAnother.bind(this);
    this.LogRow = this.LogRow.bind(this);
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


  planAnother() {
    let newState = this.state;
    if (Session.get("pressureGroup2") || Session.get("plannedSI") || Session.get("fpressure")) {
      let newDive = ["Starting Pressure : ", Session.get("pressureGroup2"),
                    "Depth : ", , Session.get("depth"),
                    "Surface Interval : ",  Session.get("plannedSI"),
                    "Ending Pressure Group : ", Session.get("fpressure"), ];
      newState.newRow = true;
      newState.dives.push(newDive);
    } else {
      return null;
    }
    newState.pai++;
    this.setState(newState);
  }

  handleClick = dive => event => {
    const { dives } = this.state;
    dives.splice(dives.indexOf(dives), 1);

    this.setState({
      dives
    });
  };

  LogRow() {
    let newComp = <Grid.Row>
        {this.state.dives.map((dive, index) => <Card key={index} fluid>
          <Header as="h2" textAlign="center"> Your Dive Log </Header>
          <Card.Meta>
            <span> Results of your previous dive. </span>
          </Card.Meta>
          <h4 as="i">Previous Dive: </h4>
          <h4 className="padding"> {dive} </h4>
          <Card.Content extra>
            <Button basic color="red" onClick={this.handleClick(dive)}>
              Delete
            </Button>
          </Card.Content>
        </Card>)}
    </Grid.Row>;
    if (this.state.newRow) {
      return (newComp);
    } else return null;
  }

  RenderTable() {
    let pic = <Grid.Row centered>
      <Image centered
          src={"https://cdn.instructables.com/F3E/ERWV/077EP281UWG/F3EERWV077EP281UWG.LARGE.jpg?auto=webp&fit=bounds"}/>
    </Grid.Row>;
    return (pic);
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
    const pressureGroup2 = Session.get("pressureGroup2");
    const fpressure = this.props.two[pressureGroup2][plannedSI];
    Session.set("fpressure", fpressure);
    this.clear();
  }

  clear() {
    this.setState({
      pgi: "",
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
    const dropdownFive = _.map(
        _.keys(this.props.one[this.state.depth]),
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
    const ipgi = Session.get("pressureGroup2")
    const dropdownFour = _.map(
        _.keys(this.props.two[ipgi]),
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
    Session.setDefault("depth", "");
    Session.setDefault("pressureGroup1", "");
    Session.setDefault("pressureGroup2", "");
    Session.setDefault("plannedSI", "");
    Session.setDefault("RNT", "");
    Session.setDefault("actualBT", "");
    Session.setDefault("totalBT", "");
    let Results =
        <Grid>
          <Grid.Row centered columns={4} style={{ paddingTop: '25px' }}>
            <Grid.Row style={{ paddingBottom: '25px' }}>
              <Header style={{ padding: 10 }} as="h4" textAlign="center" as="i">
                * Developer Notes: Do not use this planner to plan your dives in real life! This is a
                prototype that was created by Software Engineering Students to make an application that
                plans dives
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Card.Group className="card-group">
                <Card className="initial-dive-card" centered>
                  <Header style={{ padding: 10 }} as="h2" textAlign="center">
                    Dive Planner
                  </Header>
                  <Card.Meta>
                                    <span className='date'> Calculates the amount of time you need to stay in the water while also telling the pressure group
                                        you end with at the end of your diving session. </span>
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
                          floated="right"
                          color="blue"
                          inverted
                          onClick={this.submitDive}
                      > Submit </Button>
                      <Button
                          onClick={this.clear}
                          floated="right"
                          color="red"
                          inverted> Reset
                      </Button>
                    </Form>
                  </Container>
                </Card>
                <Card style={{ padding: 20 }} centered>
                  <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}> Planning Results </Header>
                  <Card.Meta>
                    <span>The results of your dive based on your input parameters.</span>
                  </Card.Meta>
                  <h4 as="i">Starting Pressure Group: {Session.get("pgi")} </h4>
                  <h4 as="i">Depth: {Session.get("depth")}</h4>
                  <h4>Residual Nitrogen Time: {Session.get("pressureGroup1")}</h4>
                  <h4 as="i">Actual Bottom Time: {Session.get("actualBT")}</h4>
                  <h4>Total Bottom Time: {Session.get("totalBT")}</h4>
                  <h4>Final Pressure Group: {Session.get("pressureGroup2")}</h4>
                  <i>Note: If Final Pressure Group does not show anything, refer to the PADI Table. Your
                    Total Bottom time should correspond based on the depth.</i>
                </Card>


                <Card centered>
                  <Container style={{ padding: 20 }}>
                    <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}> Surface Interval Group
                      Calculator</Header>
                    <Card.Meta>
                                        <span style={{ paddingBottom: 25 }}> Use this feature if you plan to dive multiple times. This to calculate the initial
                                            pressure group you will need to start with in the Dive Planner.</span>
                    </Card.Meta>
                    <h2 style={{ fontSize: 14 }}>Initial Pressure Group</h2>
                    {/*<h2 as="i" style={{fontSize: 14}}>{Session.get("pressureGroup2")} </h2>*/}
                    <Form style={{ marginTop: 25 }}>
                      <Form.Dropdown
                          fluid
                          search
                          selection
                          options={this.state.dropdownThree}
                          name={"pressureGroup2"}
                          value={this.state.pressureGroup2}
                          onChange={this.updateState}
                          onClick={this.dropdownThree}
                          placeholder={this.state.pressureGroup2}
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
                          floated="right"
                          color="blue"
                          inverted
                          onClick={this.submitSI}
                      > Submit </Button>
                      <Button
                          onClick={this.clear}
                          floated="right"
                          color="red"
                          inverted> Reset
                      </Button>
                    </Form>
                  </Container>
                </Card>
                <Card style={{ padding: 20 }} centered>
                  <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>Your Next Dive</Header>
                  <Card.Meta>
                    <span> Results of the Final Pressure Group after a certain amount of time in the surface. </span>
                  </Card.Meta>
                  <h4 as="i">Starting Pressure Group: {Session.get("pressureGroup2")} </h4>
                  <h4 as="i">Surface Interval: {Session.get("plannedSI")}</h4>
                  <h4>Final Pressure Group: {Session.get("fpressure")}</h4>
                  <Form style={divStyle}>
                    <Button onClick={this.clear} floated="right" color="red" inverted> Reset </Button>
                    <Button onClick={this.planAnother} floated="right" color="blue" inverted> Plan Another </Button>
                  </Form>
                </Card>
              </Card.Group>
            </Grid.Row>

          </Grid.Row>
          <Grid.Row centered>
            { this.state.newRow ? this.LogRow() : null }
          </Grid.Row>
          <Grid.Row centered>
            { this.RenderTable() }
          </Grid.Row>
        </Grid>;

    //{ this.state.newRow ? <LogRow /> : null }
    //<RenderTable />;

    return (Results);
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
