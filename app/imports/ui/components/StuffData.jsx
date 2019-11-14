import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { DataTableOne } from "/imports/api/data/dataTableOne.js";
import { DataTableTwo } from "/imports/api/data/dataTableTwo.js";
import { DataTableThree } from "/imports/api/data/dataTableThree.js";
import { Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

const _ = require("underscore");

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class StuffData extends React.Component {
  constructor(props) {
    super(props);
  }

  renderComponent() {
    // Prints out all table objects
    console.log(this.props.one);
    console.log(this.props.two);
    console.log(this.props.three);

    // Prints out all keys of table one
    const keys = _.without(_.keys(this.props.one), "_id");
    console.log(keys);

    // Traverses the object of two and prints specific data
    const element = "B";
    const data = this.props.two[element];
    const element2 = "0:00-0:47";
    const data2 = this.props.two[element][element2];
    console.log(data);
    console.log(data2);

    // Does nothing to the page
    return <div></div>;
  }

  render() {
    return this.props.ready ? (
      this.renderComponent()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }
}

// All props used for this component
StuffData.propTypes = {
  one: PropTypes.object.isRequired,
  two: PropTypes.object.isRequired,
  three: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("DataTableOne");
  const subscription2 = Meteor.subscribe("DataTableTwo");
  const subscription3 = Meteor.subscribe("DataTableThree");

  let tableOne = {};
  let tableTwo = {};
  let tableThree = {};
  if (subscription.ready() && subscription2.ready() && subscription3.ready()) {
    tableOne = DataTableOne.find({}).fetch();
    tableTwo = DataTableTwo.find({}).fetch();
    tableThree = DataTableThree.find({}).fetch();
  }

  return {
    // Returns the entire array, [0] since we want the object
    one: tableOne[0],
    two: tableTwo[0],
    three: tableThree[0],
    ready:
      subscription.ready() && subscription2.ready() && subscription3.ready()
  };
})(StuffData);
