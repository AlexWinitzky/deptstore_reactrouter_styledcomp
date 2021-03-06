import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Grid, Image, Icon, } from 'semantic-ui-react';
import styled from 'styled-components';
import DepartmentForm from './DepartmentForm';


class Departments extends React.Component {
  state = { departments: [], toggle: false }

  componentDidMount() {
    axios.get("api/departments")
      .then(res => {
        this.setState({ departments: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  toggleForm = () => this.setState({ toggle: !this.state.toggle })

  add = (data) => {
    this.setState({ departments: [data, ...this.state.departments] })
  }

  showDepts = () => {
    return this.state.departments.map(d => (
      <Link to={`departments/${d.id}`}>
        <div style={{ padding: '60px', }}>
          <CardStyles>
            <Card.Header
              style={{
                fontSize: "20px",
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0efee',
                color: '#537a0d',
              }}>
              {d.name}
            </Card.Header>
            <Card.Content
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0efee',
              }}>
              <Image
                style={{
                  height: '120px',
                  width: '160px',
                }}
                src={"https://loremflickr.com/400/400/commerce?" + Math.random()}
                alt="Department" />
            </Card.Content>
          </CardStyles>
        </div>
      </Link>
    ))
  }

  render() {
    return (
      <Page>
        <Container>
          <ButtonStyle>
            {this.state.toggle ?
              <div style={{ width: '80%' }}>
                <DepartmentForm add={this.add} toggleForm={this.toggleForm} />
              </div>
              :
              <Button inverted color='green' onClick={() => this.toggleForm()} style={{
                borderRadius: '50%',
              }}>
                <Icon name="add" />
                Add a Department
              </Button>
            }
          </ButtonStyle>
        </Container>
        <Grid>
          <Grid.Row>
            <Grid.Column relaxed columns={4}>
              <CardGroup>
                {this.showDepts()}
              </CardGroup>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Page>
    )
  }
}

const CardStyles = styled(Card)`
  height: 200px;
  width: 180px;
  `
const CardGroup = styled(Card.Group)`
  display: flex;
  justify-content: center;
`
const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 160px;
`
export default Departments
