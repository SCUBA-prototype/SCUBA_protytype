import React from 'react';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Dives } from '/imports/api/dive/dive';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class Dive extends React.Component {

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
            <Card>
                {/*<Image src={this.props.dive.image}/>*/}
                <Card.Content>
                    <Card.Header>{this.props.dive.name}</Card.Header>
                    <Card.Meta>{this.props.dive.address}</Card.Meta>
                    <Card.Meta>{this.props.dive.price}</Card.Meta>
                    <Card.Description>{this.props.dive.description}</Card.Description>
                </Card.Content>
                <Card.Content extra textAlign='center'>
                    <Link to={`/divepage/${this.props.dive._id}`}>
                        <Button color={'red'}> View Dive</Button>
                    </Link>
                </Card.Content>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    <Card.Content extra>
                        <Grid columns={2}>
                            <Grid.Column textAlign='left'>
                                <Button basic>
                                    <Link to={`/edit/${this.props.dive._id}`}>Edit</Link>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Button basic onClick={this.onClick}>Delete</Button>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                ) : ''}
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
Dive.propTypes = {
    dive: PropTypes.object.isRequired,
};

export default withRouter(Dive);
