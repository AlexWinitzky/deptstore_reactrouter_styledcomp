import React from 'react';
import axios from 'axios';
import { Form, Container, Icon, } from 'semantic-ui-react';


class ItemForm extends React.Component {
  state = { name: '', description: '', price: '', image: '' }

  componentDidMount() {
    const { id, department_id, } = this.props
    if (id && department_id)
      axios.get(`/api/departments/${department_id}/items/${id}`)
        .then(res => {
          const { name, description, price, image } = res.data
          this.setState({ name, description, price, image })
        })
        .catch(err => {
          console.log(err.response)
        })
  }

  handleChange = (e) => {
    const { target: { name, value } } = e
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const item = { ...this.state }
    const { id, department_id, } = this.props
    if (id && department_id) {
      axios.put(`/api/departments/${department_id}/items/${id}`, item)
        .then(res => {
          this.props.update(res.data)
        })
    } else {
      axios.post(`/api/departments/${department_id}/items`, item)
        .then(res => {
          this.props.add(res.data)
        })
    }
    this.props.close()
  }

  render() {
    const { name, description, price, image } = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="name"
            placeholder="Item Name"
            autoFocus
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="price"
            placeholder="Price"
            value={price}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="image"
            value={image}
            type="hidden"
          />
          <Form.Button inverted color='green'>
            <Icon name='send' />
            Submit
          </Form.Button>
        </Form>
      </Container>
    )
  }
}

export default ItemForm