import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Button, Container, Image, Icon, } from 'semantic-ui-react';
import Reviews from './Reviews';

class Item extends React.Component {
  state = { item: {} }

  componentDidMount() {
    const { match: { params: { id, department_id } } } = this.props
    axios.get(`/api/departments/${department_id}/items/${id}`)
      .then(res => {
        this.setState({ item: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  handleDelete = () => {
    const { id, department_id } = this.props.match.params;
    axios.delete(`/api/departments/${department_id}/items/${id}`)
      .then(res => {
        this.props.history.push(`/departments/${department_id}`)
      })
  }

  render() {
    const { match: { params: { id, department_id } } } = this.props
    const { name, description, price } = this.state.item
    return (
      <Container style={{ marginBottom: '40px' }}>
        <Link to={`/departments/${department_id}`}>
          <Button color='black'>
            <Icon name='arrow alternate circle left outline' />
            Go Back
            </Button>
        </Link>
        <h1>{name}</h1>
        <Image src={"https://loremflickr.com/400/400/products?" + Math.random()} alt="Product" />
        <h2>${price}</h2>
        <h3>Product Description:</h3>
        <p>{description}</p>
        <Link to={`/departments/${department_id}/items/${id}/edit`}>
          <Button inverted color="blue">
            <Icon name='pencil' />
            Update Item
            </Button>
        </Link>
        <Button inverted color='red' onClick={this.handleDelete}>
          <Icon name='trash' />
          Delete Item
        </Button>
        <Reviews id={id} />
      </Container>
    )
  }
}

export default Item
