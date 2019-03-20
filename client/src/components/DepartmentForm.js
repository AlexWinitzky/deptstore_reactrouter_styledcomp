import React from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'semantic-ui-react';


class DepartmentForm extends React.Component {
  state = { name: '' }

  componentDidMount() {
    const { match: { params: { id } } } = this.props
    if (id)
      axios.get(`/api/departments/${id}`)
        .then(res => {
          debugger
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
    const { match: { params: { id } } } = this.props
    if (id) {
      axios.put(`/api/departments/${id}`, department)
        .then(res => {
          this.props.history.push(`/departments/${id}`)
        })
    } else {
      axios.post(`/api/departments`, department)
        .then(res => {
          this.props.history.push("/departments")
        })
    }
  }

  render() {
    const { name } = this.state
    return (
      <Container style={{marginTop: "100px"}}>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="Department Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Button
            style={{
              marginTop: "30px",
              }}>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default DepartmentForm
