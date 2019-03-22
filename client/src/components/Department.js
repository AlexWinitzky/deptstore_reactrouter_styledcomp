import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Card, Image, Icon, } from 'semantic-ui-react';


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
    return this.state.items.map(i => (
      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid black' }}>
        <Link to={`/departments/${id}/items/${i.id}`}>
          <Card style={{ height: "300px", width: '300px', textAlign: 'center' }}>
            <h3>{i.name}</h3>
            <Card.Description>
              ${i.price}
            </Card.Description>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: '20px',
              }}
            >
              <Image
                style={{
                  height: '200px',
                  width: '200px',
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
      <Container style={{ marginBottom: '40px' }}>
        <Link to={'/departments'}>
          <Button color="black">
            <Icon name='arrow alternate circle left outline' />
            Go Back
          </Button>
        </Link>
        <h1 style={{ marginTop: '30px' }}>{name}</h1>
        <div>
          <Link to={`/departments/${id}/edit`}>
            <Button inverted color='blue'>
              <Icon name='pencil' />
              Update Department
              </Button>
          </Link>
          <Button inverted onClick={this.handleDelete} color='red'>
            <Icon name='trash' />
            Remove Department
            </Button>
          <Link to={`/departments/${id}/items/new`}>
            <Button inverted color='green'>
              <Icon name='add' />
              Add an Item
            </Button>
          </Link>
          <Card.Group itemsPerRow={3}>
            {this.listItems()}
          </Card.Group>
        </div>
      </Container>
    )
  }
}

export default Department