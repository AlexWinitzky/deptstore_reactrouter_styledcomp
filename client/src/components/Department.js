import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Container, Card, Image, Icon, Modal, Grid, } from 'semantic-ui-react'
import DepartmentForm from './DepartmentForm'
import ItemForm from './ItemForm'
import styled from 'styled-components'


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
      <div key={i.id} style={{ padding: '40px' }}>
        <Link to={`/departments/${id}/items/${i.id}`}>
          <Card style={{ height: "300px", width: '300px', textAlign: 'center', backgroundColor: '#f0efee', }}>
            <Card.Header style={{
              fontSize: '20px',
              color: '#537a0d',
            }}>{i.name}</Card.Header>
            <Card.Description style={{ backgroundColor: '#f0efee', }}>${i.price}</Card.Description>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
      <Page>
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
        </Container>
        {
          this.state.items.length < 1 ?
            <Container>
              <h1>This department doesn't have any items.</h1>
            </Container>
            :
            <Grid>
              <Grid.Row>
                <Grid.Column relaxed columns={4}>
                  <CardGroup>
                    {this.listItems()}
                  </CardGroup>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        }
      </Page>
    )
  }
}

const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const CardGroup = styled(Card.Group)`
  display: flex;
  justify-content: center;
`

export default Department