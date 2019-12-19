import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Container, Card, Image, Icon, Modal, } from 'semantic-ui-react'
import DepartmentForm from './DepartmentForm'
import ItemForm from './ItemForm'


class Department extends React.Component {
  state = { department: {}, items: [], toggle: false, open: false, }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/departments/${id}`)
      .then(res => {
        this.setState({ department: res.data, })
      })

    axios.get(`/api/departments/${id}/items`)
      .then(res => {
        this.setState({ items: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  toggleForm = () => this.setState({ toggle: !this.state.toggle })

  showModal = () => this.setState({ open: !this.state.open })

  update = (data) => this.setState({ department: data })

  addItem = (item) => {
    this.setState({ items: [item, ...this.state.items] })
  }

  listItems = () => {
    const { id, } = this.props.match.params
    return this.state.items.map(i => (
      <div key={i.id} style={{ marginTop: '40px', padding: '20px', border: '1px solid black' }}>
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

  itemModal = () => {
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.showModal()}
      >
        <Modal.Header>Add A New Item</Modal.Header>
        <Modal.Content>
          <ItemForm close={this.showModal} add={this.addItem} department_id={this.state.department.id} />
        </Modal.Content>
      </Modal>
    )
  }

  handleDelete = () => {
    const { id } = this.props.match.params
    axios.delete(`/api/departments/${id}`)
      .then(res => {
        this.props.history.push("/departments")
      })
  }

  render() {
    const { department: { id, name, }, toggle, } = this.state
    return (
      <Container style={{ marginBottom: '40px' }}>
        {this.itemModal()}
        <Link to={'/departments'}>
          <Button color="black">
            <Icon name='arrow alternate circle left outline' />
            Go Back
          </Button>
        </Link>
        {toggle ?
          <DepartmentForm id={id} toggleForm={this.toggleForm} add={this.add} update={this.update} />
          :
          <div>
            <h1 style={{ marginTop: '30px' }}>{name}</h1>
            <Button inverted color='blue' onClick={() => this.toggleForm()}>
              <Icon name='pencil' />
              Rename
            </Button>
            <Button inverted onClick={this.handleDelete} color='red'>
              <Icon name='trash' />
              Remove
            </Button>
            <Button inverted color='green' onClick={() => this.showModal()}>
              <Icon name='add' />
              Add Item
            </Button>
          </div>
        }
        <Card.Group itemsPerRow={3}>
          {this.listItems()}
        </Card.Group>
      </Container>
    )
  }
}

export default Department