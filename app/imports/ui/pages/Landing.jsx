import React from 'react';
import { Grid, Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    const divStyle = { paddingBottom: '5px', paddingTop: '5px' };
    return (
        <div className='landing-background'>
          <div className='landing-shadow'>
            <Grid container stackable centered columns={1}>
              <Grid.Column textAlign={'center'}>
                <Grid.Row className="title-main">
                  <p className="main-text">
                    React Recreational Dive Planner
                  </p>
                  <p className="side-text">
                    prototype
                  </p>
                </Grid.Row>
              </Grid.Column>
            </Grid>
            <Grid container stackable centered columns={2} style={divStyle}>
              <Grid.Column textAlign={'center'}>
                <Card border='none' centered className="landing-card">
                  <Card.Content>
                    <Image size='large' src='/images/diveplanner.jpg'/>
                    <p className="padi-plan">Plan your next PADI Table based recreational dive trip with our React Dive
                      Planner for a memorable and safe experience!
                    </p>
                    <Card.Description>
                      <Card.Content extra textAlign='center'>
                        <Link to={'/add'}>
                          <Button color={'black'} style={{ padding: 20, marginTop: 30 }}> Plan Dive Now </Button>
                        </Link>
                      </Card.Content>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    );
  }
}

export default Landing;
