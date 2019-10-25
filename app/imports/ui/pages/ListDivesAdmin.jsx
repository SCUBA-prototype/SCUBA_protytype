import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Dives } from '/imports/api/dive/dive';
import { diveList } from '/imports/api/dive/diveList';
import Dive from '/imports/ui/components/Dives';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListDivesAdmin extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        const divStyle = { paddingBottom: '85px' };
        return (
            <Container style={divStyle}>
                <Header as="h2" textAlign="center">Dives List</Header>
                <Card.Group centered>
                    {this.diveList.map((dive, index) => <Dive
                        dive={dive}
                        key={index}
                    />)}
                </Card.Group>
            </Container>
        );
    }
}

/** Require an array of Stuff documents in the props. */
ListDivesAdmin.propTypes = {
    dives: PropTypes.array.isRequired,
    diveList: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('DiveList');
    return {
        diveList: diveList.find({}, { sort: { createdAt: -1 }}).fetch(),
        dives: Dives.find({}).fetch(),
        ready: subscription.ready(),
    };
})(ListDivesAdmin);
