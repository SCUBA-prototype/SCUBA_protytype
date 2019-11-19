import React from 'react';
import { Grid, Checkbox, Segment, Header, Link } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Dives, DiveSchema } from '/imports/api/dive/dive';
import { Roles } from 'meteor/alanning:roles';
import { Redirect } from 'react-router';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class InputDive extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.insertCallback = this.insertCallback.bind(this);
        this.formRef = null;
        this.state = {
          renderResults: false,
          value: '',
          results: {
            name: '',
            depth: 0,
            bottomTime: 0,
            surfaceIntervalTime: 0,
            startingPressureGroup: ''
          },
        };
    }


  submit(data) {
    let { name, depth, bottomTime, surfaceIntervalTime, startingPressureGroup } = data;
    Dives.insert({ name, depth, bottomTime, surfaceIntervalTime, startingPressureGroup }, this.insertCallback);
    this.setState({ renderResults: true });
    }

    onChange(event) {
      let personally = this.setState.bind(this);
      let newState  = this.state;
      return function (key) {
        if (event) {
          let newRes = newState.results;
          newRes[key] = event;
          personally({ results: newRes });
        }
      }
    }

    deleteCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Delete succeeded' });
        }
    }
    insertCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Add succeeded' });

        }
    }

    render() {

      let newChange = this.onChange.bind(this);
      let { isLoading, value, results } = this.state;
      let submit = this.submit.bind(this);

      if (this.state.renderResults) {
        return <Redirect to={{
          pathname: '/listdives',
          state: { results },
      }}/>;
      }

        return (
            <Grid container centered>
              <Grid.Column>
                <Header as="h2" textAlign="center">Add Dive</Header>
                <AutoForm ref={(ref) => {this.formRef = ref; }} schema ={DiveSchema} onSubmit={function () {
                  submit(results);
                }}>
                    <TextField value={results.name} onChange={function (event) {
                      newChange(event)("name");
                    }} name='name'/>
                    <TextField value={results.depth} onChange={function (event) {
                      newChange(event)("depth");
                    }} name='depth'/>
                    <TextField value={results.bottomTime} onChange={function (event) {
                      newChange(event)("bottomTime");
                    }} name='bottomTime'/>
                    <TextField value={results.surfaceIntervalTime}  onChange={function (event) {
                      newChange(event)("surfaceIntervalTime");
                    }} name='surfaceIntervalTime'/>
                    <TextField value={results.startingPressureGroup} onChange={function (event) {
                      newChange(event)("startingPressureGroup");
                    }} name='startingPressureGroup'/>
                    <SubmitField type={"submit"} />
                    <ErrorsField />
                </AutoForm>
              </Grid.Column>
            </Grid>
        );
    }
}


export default InputDive;
