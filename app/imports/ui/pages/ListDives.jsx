import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Dives } from '/imports/api/dive/dive';
import Dive from '/imports/ui/components/Dive';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListDives extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
      const divStyle = { paddingBottom: '85px' }
        return (this.props.ready) ? (
          <Container style={divStyle}>
            <Header as="h2" textAlign="center">Dives List</Header>
            <Card.Group centered>
              <Dive dives={this.props.dives}/>
            </Card.Group>
          </Container>
      ) : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        const divStyle = { paddingBottom: '85px' };
        return (
            <Container style={divStyle}>
                <Header as="h2" textAlign="center">Dives List</Header>
                <Card.Group centered>
                  <Dive dives={this.props.dives}/>
                </Card.Group>
            </Container>
        );
    }
}

/** Require an array of Stuff documents in the props. */
ListDives.propTypes = {
    dives: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Dives');
    return {
        dives: Dives.find({}).fetch(),
        ready: subscription.ready(),
    };
})(ListDives);
