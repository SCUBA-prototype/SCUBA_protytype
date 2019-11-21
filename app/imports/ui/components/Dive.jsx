/* eslint max-len: ["error", { "code": 190 }] */
import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { Dives } from '/imports/api/dive/dive';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as PADI from "/imports/functions.js";

class Dive extends React.Component {

  constructor(props) {
    super(props);
    this.getNoDecompLimit = this.getNoDecompLimit.bind(this);
    this.dive = this.dive.bind(this);
    this.surface = this.surface.bind(this);
    this.depthCol = [];
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
  };

  let
  indexToPGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  function
  depthToIndex(depth) {
    if (depth <= 35) {
      return 0;
    } else if (depth <= 140) {
      return Math.ceil(depth/10) - 3;
    } else {
      console.log("ERROR: Invalid Depth");
      return;
    }
  }

  let
  bottomTable = [[10,19,25,29,32,36,40,44,48,52,57,62,67,73,79,85,92,100,108,117,127,139,152,168,188,205],[9,16,22,25,27,31,34,37,40,44,48,51,55,60,64,69,74,79,85,91,97,104,111,120,129,140],[7,13,17,19,21,24,26,28,31,33,36,39,41,44,47,50,53,57,60,63,67,71,75,80],[6,11,14,16,17,19,21,23,25,27,29,31,33,35,37,39,42,44,47,49,52,54,55],[5,9,12,13,15,16,18,19,21,22,24,26,27,29,31,33,35,36,38,40],[4,8,10,11,13,14,15,17,18,19,21,22,23,25,26,28,29,30],[4,7,9,10,11,12,13,15,16,17,18,19,21,22,23,24,25],[3,6,8,9,10,11,12,13,14,15,16,17,18,19,20],[3,6,7,8,9,10,11,12,13,14,14,15,16],[3,5,6,7,8,9,10,11,12,12,13],[3,5,6,7,8,8,9,10],[0,4,5,6,7,8]];

  let
  surfaceTable =
      [[180],[47,228],[21,69,250],[8,30,78,259],[7,16,38,87,268],[7,15,24,46,94,275],[6,13,22,31,53,101,282],[5,12,20,28,37,59,107,288],[5,11,18,26,34,43,65,113,294],[5,11,17,24,31,40,49,71,119,300],[4,10,16,22,29,37,45,54,76,124,305],[4,9,15,21,27,34,42,50,59,81,129,310],[4,9,14,19,25,32,39,46,55,64,85,134,315],[3,8,13,18,24,30,36,43,51,59,68,90,138,319],[3,8,12,17,23,28,34,41,47,55,63,72,94,143,324],[3,7,12,16,21,27,32,38,45,51,59,67,76,98,147,328],[3,7,11,16,20,25,30,36,42,48,55,63,71,80,102,150,331],[3,7,11,15,19,24,29,34,40,46,52,59,67,75,84,106,154,335],[3,6,10,14,18,23,27,32,38,43,49,56,63,70,78,87,109,158,339],[2,6,10,13,17,22,26,31,36,41,47,53,59,66,73,82,91,113,161,342],[2,6,9,13,17,21,25,29,34,39,44,50,56,62,69,77,85,94,116,164,345],[2,5,9,12,16,20,24,28,33,37,42,47,53,59,65,72,80,88,97,119,167,348],[2,5,8,12,15,19,23,27,31,36,40,45,50,56,62,68,75,83,91,100,122,170,351],[2,5,8,11,15,18,22,26,30,34,39,43,48,53,59,65,71,78,86,94,103,125,173,354],[2,5,8,11,14,18,21,25,29,33,37,41,46,51,56,62,68,74,81,89,97,106,128,176,357],[2,5,8,11,14,17,20,24,28,31,35,40,44,49,54,59,65,71,77,84,91,100,109,131,179,360]];

  function
  getNoDecompLimit(depth, startPGroup) {
    let depthCol = this.bottomTable[this.depthToIndex(depth)];
    let noDecompLimit = this.depthCol[this.depthCol.length - 1];

    if(startPGroup !== undefined) {
      let index = this.pGroupToIndex[startPGroup];
      if(index < depthCol.length) {
        noDecompLimit -= depthCol[index];
      } else {
        console.log("ERROR: Pressure Group is Invalid for Depth");
        noDecompLimit = -1;
      }
    }
    return noDecompLimit;
  }

  function
  dive(depth, bottomTime, startPGroup) {
    let depthCol = this.bottomTable[depthToIndex(depth)];
    let noDecompLimit = depthCol[depthCol.length - 1];
    let resNitroTime = startPGroup === undefined ? 0 : depthCol[pGroupToIndex[startPGroup]];
    let totalBottomTime = resNitroTime + bottomTime;

    if(totalBottomTime > noDecompLimit) {
      console.log("WARNING: No-Decompression Limit Exceeded");
      return null;
    } else {
      let index = depthCol.findIndex(function(val){return val >= totalBottomTime;});

      //If index isn't the last array element and the next element is equal to this one
      if(index < (depthCol.length - 1) && depthCol[index + 1] == depthCol[index]) {
        //This element is represented by an arrow in the PADI table. Return next pressure group.
        return indexToPGroup[index + 1];
      } else {
        return indexToPGroup[index];
      }
    }
  }

  function
  surface(startPGroup, surfaceInterval) {
    let pressureIndex = this.pGroupToIndex[startPGroup];
    let sTableRow = this.surfaceTable[pressureIndex];
    let indexMovement = sTableRow.findIndex(function(val){return surfaceInterval <= val});

    return indexMovement >= 0 ? this.indexToPGroup[pressureIndex - indexMovement] : null;
  }


// console.log(dive(120, 11));
// console.log(dive(120, 12));
// console.log(dive(120, 11, 'B'));
// console.log(dive(120, 12, 'B'));
// console.log(dive(120, 6, 'B'));
// console.log(dive(120, 7, 'B'));

// console.log(getNoDecompLimit(120));
// console.log(getNoDecompLimit(120, 'B'));
// console.log(getNoDecompLimit(120, 'I'));
// console.log(getNoDecompLimit(120, 'K'));
// console.log(getNoDecompLimit(120, 'L'));

// console.log(surface('A', 0));
// console.log(surface('A', 93));
// console.log(surface('A', 180));
// console.log(surface('A', 181));
// console.log(surface('G', 0));
// console.log(surface('G', 31));
// console.log(surface('G', 32));
// console.log(surface('G', 282));
// console.log(surface('G', 283));
// console.log(surface('Z', 0));
// console.log(surface('Z', 2));
// console.log(surface('Z', 360));
// console.log(surface('Z', 361));



  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

render() {
  return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
}

/** Render the page once subscriptions have been received. */
renderPage() {
  return (
      <Container>
        <Header as="h2" textAlign="center">{this.props.dives[0].name}'s Dive</Header>
        <Header as="h4" textAlign="left">Expected pressure group: {this.surface(this.props.dives[0].startingPressureGroup,this.props.dives[0].surfaceIntervalTime)}</Header>
        <Header as="h4" textAlign="left">No Decompression Limit: {this.getNoDecompLimit(this.props.dives[0].depth, this.props.dives[0].startingPressureGroup)}</Header>
      </Container>
  );
}
}

Dive.propTypes = {
  location: PropTypes.object.isRequired,
  dives: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Dives');

  return {
    dives: Dives.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Dive);
