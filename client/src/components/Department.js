import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Card, Image, Grid } from 'semantic-ui-react';


class Department extends React.Component {
  state = { department: {}, items: [] }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/departments/${id}`)
      .then(res => {
        this.setState({ department: res.data, });
      })

    axios.get(`/api/departments/${id}/items`)
      .then(res => {
        this.setState({ items: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  listItems = () => {
    const { id, } = this.props.match.params
    return this.state.items.map( i => (
      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid black' }}>
        <Link to={`/departments/${id}/items/${i.id}`}>
          <Card style={{ height: "120px", width: '200px' }}>
            <p>{i.name}</p>
            <Card.Description>${i.price}</Card.Description>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Image
                style={{
                  height: '60px',
                  width: '60px',
                }}
                src={"https://loremflickr.com/400/400/products?" + Math.random()} alt="Product" />
            </div>
          </Card>
        </Link>
      </div>
    ))
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios.delete(`/api/departments/${id}`)
      .then(res => {
        this.props.history.push("/departments")
      })
  }

  render() {
    const { id, name } = this.state.department
    return (
      <Container style={{ paddingTop: '20px', marginBottom: '40px' }}>
        <h1>{name}</h1>
        <Link to={'/departments'}>
        <Button style={{marginBottom: '20px'}}>Go Back</Button>
        </Link>
        <div>
          <Link to={`/departments/${id}/edit`}>
            <Button>Update Department</Button>
          </Link>
          <Button onClick={this.handleDelete}>Remove Department</Button>
          <Link to={`/departments/${id}/items/new`}>
            <Button>Add an Item</Button>
          </Link>
          <Grid>
            <Grid.Row>
            <Grid.Column relaxed columns={4}>
              <Card.Group>
                  {this.listItems()}
              </Card.Group>
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    )
  }
}

export default Department