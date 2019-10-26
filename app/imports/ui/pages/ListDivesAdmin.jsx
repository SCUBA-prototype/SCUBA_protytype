import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Container, Header, Loader, Card, Grid, Image, Button, table} from 'semantic-ui-react';
import {Dives} from '/imports/api/dive/dive';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListDives extends React.Component {

    render() {
        const divStyle = {paddingBottom: '5px', paddingTop: '5px'};
        return (
            <table className="ui striped table">
                <thead>
                <tr>
                    <th>Dive Name</th>
                    <th>Dive Date Planned</th>
                    <th>Gas Used</th>
                    <th># of Dives</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Waikiki Beach Dive</td>
                    <td>September 14, 2013</td>
                    <td>Air</td>
                    <td>3</td>
                    <td><Button color={'red'}> View </Button></td>
                </tr>
                <tr>
                    <td>Family Dive @ Bahamas</td>
                    <td>January 11, 2014</td>
                    <td>Air</td>
                    <td>3</td>
                    <td><Button color={'red'}> View </Button></td>
                </tr>
                <tr>
                    <td>Waimea Bay</td>
                    <td>May 11, 2014</td>
                    <td>Air</td>
                    <td>3</td>
                    <td><Button color={'red'}> View </Button></td>
                </tr>
                <tr>
                    <td>Waimea Bay</td>
                    <td>September 14, 2013</td>
                    <td>Air</td>
                    <td>3</td>
                    <td><Button color={'red'}> View </Button></td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default ListDives;