import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Button, Container, Image, Icon, Modal, } from 'semantic-ui-react';
import Reviews from './Reviews';
import ItemForm from './ItemForm'

class Item extends React.Component {
  state = { item: {}, open: false }

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

  showModal = () => this.setState({ open: !this.state.open })

  updateItem = (item) => {
    this.setState({ item, })
  }

  itemModal = () => {
    const { match: { params: { id, department_id } } } = this.props
    debugger
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.showModal()}
      >
        <Modal.Header>Update This Item</Modal.Header>
        <Modal.Content>
          <ItemForm id={id} department_id={department_id} close={this.showModal} update={this.updateItem} />
        </Modal.Content>
      </Modal>
    )
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
        {this.itemModal()}
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
        <Button inverted color="blue" onClick={() => this.showModal()}>
          <Icon name='pencil' />
          Update Item
            </Button>
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
