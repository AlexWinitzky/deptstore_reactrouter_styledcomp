import React from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';


class ItemForm extends React.Component {
  state = { name: '', description: '', price: '', image: '' }

  componentDidMount() {
    const { match: { params: { id, department_id } } } = this.props
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
    const { match: { params: { id, department_id } } } = this.props
    if (id && department_id) {
      axios.put(`/api/departments/${department_id}/items/${id}`, item)
        .then(res => {
          this.props.history.push(`/departments/${department_id}/items/${id}`)
        })
    } else {
      axios.post(`/api/departments/${department_id}/items`, item)
        .then(res => {
          this.props.history.push(`/departments/${department_id}`)
        })
    }
  }

  render() {
    const { name, description, price, image } = this.state
    return (
      <Container style={{marginTop: "100px"}}>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="Item Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <input
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={price}
            onChange={this.handleChange}
            required
          />
          <input
            name="image"
            value={image}
            type="hidden"
          />
          <Button color='green' style={{marginTop: "30px"}}>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default ItemForm