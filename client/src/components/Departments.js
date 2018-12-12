import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, Image, } from 'semantic-ui-react';
import styled from 'styled-components';


class Departments extends React.Component {
  state = { departments: [] }

  componentDidMount() {
    axios.get("api/departments")
      .then(res => {
        this.setState({ departments: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  showDepts = () => {
    return this.state.departments.map(d => (
      <Link to={`departments/${d.id}`}>
        <CardStyles>
          <Card.Header
            style={{
              fontSize: "20px",
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              }}>
            {d.name}
          </Card.Header>
          <Card.Content>
            <Image
              style ={{
                height: '100px',
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
              src={d.image}
              alt="Department"/>
          </Card.Content>
        </CardStyles>
      </Link>
    ))
  }

  render() {
    return (
      <Page>
        <Container>
          <ButtonStyle>
            <Link to="/departments/new">
              <Button>Add a Department</Button>
            </Link>
          </ButtonStyle>
          <Grid>
            <Grid.Row>
              <Grid.Column relaxed columns={2}>
                <CardGroup>
                  {this.showDepts()}
                </CardGroup>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Page>
    )
  }
}

const CardStyles = styled(Card)`
  height: 200px;
  width: 180px;
`;

const CardGroup = styled(Card.Group)`
  padding: 20px;

`
const Page = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export default Departments