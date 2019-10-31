import React from 'react';
import { Dives, DiveSchema } from '/imports/api/dive/dive';
import { Grid, Segment, Header } from 'semantic-ui-react';
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
        const owner = Meteor.user().username;
        Dives.insert({ name, depth, bottomTime, surfaceIntervalTime, startingPressureGroup }, this.insertCallback);
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Add Dive</Header>
                    <Header as="h3" textAlign="center">How do you plan on diving today? Let us help.</Header>
                    <AutoForm ref={(ref) => { this.formRef = ref; }} schema={DiveSchema} onSubmit={this.submit}>
                        <Segment>
                            <TextField name='name'/>
                            <NumField name='depth' decimal={false}/>
                            <NumField name='bottomTime' decimal={false}/>
                            <NumField name='surfaceIntervalTime' decimal={false}/>
                            <TextField name='startingPressureGroup'/>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default AddDiveAdmin;
