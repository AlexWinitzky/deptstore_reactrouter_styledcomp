import React from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';


class DepartmentForm extends React.Component {
  state = { name: '' }

  componentDidMount() {
    const { id } = this.props
    if (id)
      axios.get(`/api/departments/${id}`)
        .then(res => {
          this.setState({ name: res.data.name })
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
    const department = { ...this.state }
    const { id, update, toggleForm, } = this.props
    if (id) {
      axios.put(`/api/departments/${id}`, department)
        .then(res => {
          update(res.data)
          toggleForm()
        })
    } else {
      const { add, toggleForm, } = this.props
      axios.post('/api/departments', department)
        .then(res => {
          add(res.data)
          toggleForm()
        })
    }
  }

  render() {
    const { name } = this.state
    return (
      <Container style={{ marginTop: "30px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="name"
            placeholder="Department Name"
            required
            autoFocus
            value={name}
            onChange={this.handleChange}
          />
          <Button
            inverted
            icon='send'
            content='Submit'
            color='green'
          />
          <Button
            inverted
            content='Cancel'
            color='red'
            icon='cancel'
            onClick={() => this.props.toggleForm()}
          />
        </Form>
      </Container>
    )
  }
}

export default DepartmentForm
