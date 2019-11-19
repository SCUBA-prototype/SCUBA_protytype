/* eslint max-len: ["error", { "code": 190 }] */
import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Dives } from '/imports/api/dive/dive';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

/** Renders a table containing all of the Food documents. Use <StuffItem> to render each row. */
class Dive extends React.Component {

  constructor(props) {
    super(props);

    this.depthToIndex = this.depthToIndex.bind(this);
    this.getNDL = this.getNDL.bind(this);
    this.createCurrentDive = this.createCurrentDive.bind(this);
  }

  currentDate () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
  }

  /*
  DO NOT USE THIS FUNCTION FOR ACTUAL DIVE PLANNING.
   */

  let
  pGroupToIndex = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
  }

  let
  indexToPGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  depthToIndex(depth) {
    if (depth <= 35) {
      return 0;
    } else if (depth <= 40) {
      return 1;
    } else if (depth <= 50) {
      return 2;
    } else if (depth <= 60) {
      return 3;
    } else if (depth <= 70) {
      return 4;
    } else if (depth <= 80) {
      return 5;
    } else if (depth <= 90) {
      return 6;
    } else if (depth <= 100) {
      return 7;
    } else if (depth <= 110) {
      return 8;
    } else if (depth <= 120) {
      return 9;
    } else if (depth <= 130) {
      return 10;
    } else if (depth <= 140) {
      return 11;
    }
  }

  getNDL(depth, startPGroup) {
    let table = [[10,19,25,29,32,36,40,44,48,52,57,62,67,73,79,85,92,100,108,117,127,139,152,168,188,205],[9,16,22,25,27,31,34,37,40,44,48,51,55,60,64,69,74,79,85,91,97,104,111,120,129,140],[7,13,17,19,21,24,26,28,31,33,36,39,41,44,47,50,53,57,60,63,67,71,75,80],[6,11,14,16,17,19,21,23,25,27,29,31,33,35,37,39,42,44,47,49,52,54,55],[5,9,12,13,15,16,18,19,21,22,24,26,27,29,31,33,35,36,38,40],[4,8,10,11,13,14,15,17,18,19,21,22,23,25,26,28,29,30],[4,7,9,10,11,12,13,15,16,17,18,19,21,22,23,24,25],[3,6,8,9,10,11,12,13,14,15,16,17,18,19,20],[3,6,7,8,9,10,11,12,13,14,14,15,16],[3,5,6,7,8,9,10,11,12,12,13],[3,5,6,7,8,8,9,10],[4,4,5,6,7,8]];
    let depthCol = table[this.depthToIndex(depth)];
    if (!depthCol) return null;
    let NDL = depthCol[depthCol.length - 1];
    if(startPGroup !== undefined) {
      NDL -= depthCol[{
        'A': 0,
        'B': 1,
        'C': 2,
        'D': 3,
        'E': 4,
        'F': 5,
        'G': 6,
        'H': 7,
        'I': 8,
        'J': 9,
        'K': 10,
        'L': 11,
        'M': 12,
        'N': 13,
        'O': 14,
        'P': 15,
        'Q': 16,
        'R': 17,
        'S': 18,
        'T': 19,
        'U': 20,
        'V': 21,
        'W': 22,
        'X': 23,
        'Y': 24,
        'Z': 25,
      }[startPGroup]];
    }
    return NDL;
  }

  createCurrentDive(NDL, pGroup) {
    return pGroup;
  }


/** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

render() {
  return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
}

/** Render the page once subscriptions have been received. */
renderPage() {
  return (
      <Container>
        <Header as="h2" textAlign="center">{this.props.dives[0].name}'s Dive</Header>
        <Header as="h4" textAlign="left">Expected pressure group: {this.createCurrentDive(this.getNDL(this.props.dives[0].depth, this.props.dives[0].startingPressureGroup))}</Header>
        <Header as="h4" textAlign="left">No Decompression Limit: {this.getNDL(this.props.dives[0].depth, this.props.dives[0].startingPressureGroup)}</Header>
      </Container>
  );
}
}

/** Require an array of Food documents in the props. */
Dive.propTypes = {
  location: PropTypes.object.isRequired,
  dives: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Foods documents.
  const subscription = Meteor.subscribe('Dives');

  return {
    dives: Dives.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Dive);
