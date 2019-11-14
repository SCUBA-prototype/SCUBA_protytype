import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Card, Header, Grid, Button, Loader } from "semantic-ui-react";

const _ = require("underscore");

class DataCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isCollapsed2: false
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  render() {
    return this.props.ready ? (
      this.renderComponent()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
      isCollapsed2: !this.state.isCollapsed2
    });
  }

  renderComponent() {
    const style = {
      display: this.state.isCollapsed ? "none" : "",
      textAlign: "center",
      paddingTop: "7px",
      paddingBottom: "7px"
    };

    const style2 = {
      display: this.state.isCollapsed2 ? "none" : "",
      textAlign: "center",
      paddingTop: "7px",
      paddingBottom: "7px"
    };

    return (
      <Card fluid={true} onClick={this.toggleCollapsed}>
        <Card.Content>
          <Grid columns="equal" textAlign="center">
            <Grid.Row style={style2}>
              <Grid.Column floated={"left"}>
                <Header>Dive# {this.props.index}</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <p>
                  Depth: &nbsp;
                  {this.props.depth} &nbsp; Time: &nbsp;
                  {this.props.time} &nbsp; Planned Surface Interval: &nbsp;
                  {this.props.psi}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={style}>
              <Header>Dive# {this.props.index}</Header>
            </Grid.Row>
          </Grid>
          <Grid
            columns="equal"
            textAlign="center"
            celled="internally"
            verticalAlign="middle"
          >
            <Grid.Row style={style}>
              <Grid.Column textAlign={"right"}>Depth</Grid.Column>
              <Grid.Column>{this.props.depth}</Grid.Column>
              <Grid.Column textAlign={"right"}>Time</Grid.Column>
              <Grid.Column>{this.props.time}</Grid.Column>
              <Grid.Column textAlign={"right"}>
                Planned Surface Interval
              </Grid.Column>
              <Grid.Column>{this.props.psi}</Grid.Column>
            </Grid.Row>
            <Grid.Row style={style}>
              <Grid.Column textAlign={"right"}>
                Residual Nitrogen Time
              </Grid.Column>
              <Grid.Column>{this.props.rnt}</Grid.Column>
              <Grid.Column textAlign={"right"}>Actual Bottom Time</Grid.Column>
              <Grid.Column>{this.props.abt}</Grid.Column>
              <Grid.Column textAlign={"right"}>Total Bottom Time</Grid.Column>
              <Grid.Column>{this.props.tbt}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

DataCard.propTypes = {
  ready: PropTypes.bool.isRequired,
  depth: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  psi: PropTypes.string.isRequired,
  rnt: PropTypes.number.isRequired,
  abt: PropTypes.number.isRequired,
  tbt: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("Profiles");
  return {
    ready: subscription.ready()
  };
})(DataCard);
