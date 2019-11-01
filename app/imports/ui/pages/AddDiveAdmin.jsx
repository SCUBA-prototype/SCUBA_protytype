import React from 'react';
import { Dives, DiveSchema } from '/imports/api/dive/dive';
import { Grid, Segment, Header, Dropdown} from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';


/** Renders the Page for adding a document. */
class AddDiveAdmin extends React.Component {

    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.insertCallback = this.insertCallback.bind(this);
        this.formRef = null;
    }

    /** Notify the user of the results of the submit. If successful, clear the form. */
    insertCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Add succeeded' });
            this.formRef.reset();
        }
    }

    /** On submit, insert the data. */
    submit(data) {
        const { name, depth, bottomTime, surfaceIntervalTime, startingPressureGroup } = data;
        Dives.insert({ name, depth, bottomTime, surfaceIntervalTime, startingPressureGroup }, this.insertCallback);
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Plan Dive</Header>
                    <Header as="h3" textAlign="center">How do you plan on diving today? Let us help.</Header>
                    <Header as="h4" textAlign="left"> Depth </Header>
                    <Dropdown text="Select Depth"></Dropdown>
                    <Header as="h4" textAlign="left"> Total Bottom Time </Header>
                    <Dropdown text="00 Mins"></Dropdown>
                    <Header as="h4" textAlign="left"> Initial Pressure Group </Header>
                    <Dropdown text="A"></Dropdown>
                    <Header as="h4" textAlign="left"> Surface Interval </Header>
                    <Dropdown text="0:00"></Dropdown>
                    <Header as="h4" textAlign="left"> Pressure Group after Surface Interval</Header>
                    <Dropdown text="A"></Dropdown>
                </Grid.Column>
            </Grid>
        );
    }
}

export default AddDiveAdmin;
