import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container } from 'semantic-ui-react';

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
      <div>
        <Link to={`/departments/${id}/items/${i.id}`}>
          <li>{i.name}</li>
        </Link>
        <p>${i.price}</p>
      </div>
    ))
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios.delete(`/api/departments/${id}`)
      .then( res => {
        this.props.history.push("/departments")
      })
  }

  render() {
    const { id, name } = this.state.department
    return (
      <Container style={{paddingTop: '20px'}}>
        <h1>{name}</h1>
        <div>
          <Link to={`/departments/${id}/edit`}>
            <Button>Update Department</Button>
          </Link>
          <Button onClick={this.handleDelete}>Remove Department</Button>
          <Link to={`/departments/${id}/items/new`}>
            <Button>Add an Item</Button>
          </Link>
          <ul>
            {this.listItems()}
          </ul>
        </div>
      </Container>
    )
  }
}

export default Department