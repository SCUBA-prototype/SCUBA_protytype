import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

    render() {
        const divStyle = { paddingBottom: '5px', paddingTop: '5px' };
        return (
            <div className='landing-background'>
                <Grid container stackable centered columns={1}>
                    <Grid.Column textAlign={'center'}>
                        <Grid.Row className="title-main">
                            <p className="main-text">
                                SCUBA
                            </p>
                            <p className="side-text">
                                prototype
                            </p>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                <Grid container stackable centered columns={2} style={divStyle}>
                    <Grid.Column textAlign={'center'}>
                        <Card centered>
                            <Card.Content>
                                <Card.Header>Dive Planner</Card.Header>
                                <Image size='medium' src='/images/diveplanner.jpg'/>
                                <Card.Description>
                                    Plan and save your next diving trip for a memorable and safe experience!
                                    <p></p>
                                    <Card.Content extra textAlign='center'>
                                        <Link to={'/add'}>
                                            <Button color={'red'}> Plan Dive Now </Button>
                                        </Link>
                                    </Card.Content>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column textAlign={'center'}>
                        <Card centered>
                            <Card.Content>
                                <Card.Header>Log Book</Card.Header>
                                <Image size='medium'
                                       src='images/logbook.jpg'/>
                                <Card.Description>
                                    View saved plan dives
                                    <p></p>
                                    <Card.Content extra textAlign='center'>
                                        <Link to={'/list'}>
                                            <Button color={'red'}> Log History</Button>
                                        </Link>
                                    </Card.Content>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Landing;
