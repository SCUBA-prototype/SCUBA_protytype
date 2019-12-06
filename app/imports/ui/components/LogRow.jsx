import React from 'react';
import { Card, Image, Button, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Dives } from '/imports/api/dive/dive';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class LogRow extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }


    onClick() {
        // eslint-disable-next-line
        const result = window.confirm('Do you really want to delete?');
        if (result) {
            Dives.remove(this.props.dive._id, this.deleteCallback);
        }
        return false;
    }

    deleteCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Delete succeeded' });
        }
    }

    render() {
        return (
            <Grid.Row>
              <Card.Group>
                <Card>
                  <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}> Your Dive Log </Header>
                  <Card.Meta>
                    <span> Results of your previous dive. </span>
                  </Card.Meta>
                  <h4 as="i">Previous Dive: {this.state.props.dives[this.state.pai]} </h4>
                </Card>
              </Card.Group>
            </Grid.Row>
        );
    }
}

/** Require a document to be passed to this component. */
LogRow.propTypes = {
    dives: PropTypes.object.isRequired,
};

export default withRouter(LogRow);
