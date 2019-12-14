import React from "react";
import { Form, Rating, Dropdown } from "semantic-ui-react";
import axios from "axios";

class ReviewForm extends React.Component {
  state = { title: '', body: '', author: '', rating: 0, image: '', }

  componentDidMount() {
    if (this.props.edit) {
      axios.get(`/api/items/${this.props.item_id}/reviews/${this.props.id}`)
        .then(res => {
          // the long way
          // const { title, body, author, rating, image } = res.data
          // this.setState({ title, body, author, rating, image })
          this.setState({ ...res.data })
        })
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleRating = (e, { rating }) => {
    this.setState({ rating })
  }

  handleImage = (e) => {
    const image = e.target.currentSrc
    this.setState({ image })
  }


  dropdownImageSelect = () => {
    const { image } = this.state
    const images = [
      {
        text: 'blue',
        value: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set1',
        image: {
          avatar: true,
          src: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set1'
        },
      },
      {
        text: 'purple',
        value: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set2',
        image: {
          avatar: true,
          src: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set2'
        },
      },
      {
        text: 'green',
        value: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set3',
        image: {
          avatar: true,
          src: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set3'
        },
      }
    ]
    return (
      <Dropdown
        name="image"
        placeholder='Select an Avatar'
        compact
        options={images}
        value={image}
        onChange={this.handleImage}
      />
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.edit) {
      const { item_id, id, } = this.props
      axios.put(`/api/items/${item_id}/reviews/${id}`, { ...this.state })
        .then(res => {
          this.props.updateReviewsArray(res.data)
          this.props.toggleEdit()
        })
    } else {
      const { item_id } = this.props
      axios.post(`/api/items/${item_id}/reviews`, { ...this.state })
        .then(res => this.props.addReview(res.data))
      this.props.toggle()
    }
  }

  render() {
    const { title, body, author, rating } = this.state
    return (
      <div style={{ marginLeft: '100px' }}>
        <Form style={this.props.edit ? { marginLeft: '-50px' } : { marginTop: '10px', }} onSubmit={this.handleSubmit}>
          <Form.Group width="equal">
            <Rating
              name="rating"
              icon="star"
              defaultRating={1}
              maxRating={5}
              rating={rating}
              clearable
              onRate={this.handleRating}
            />
          </Form.Group>
          <Form.Group style={this.props.edit ? { display: 'flex', flexDirection: 'column', flexShrink: 3 } : {}}>
            <Form.Input
              name="title"
              label="Title"
              placeholder="Title"
              required
              value={title}
              onChange={this.handleChange}
            />
            <Form.Input
              name="body"
              label="Body"
              placeholder="Body"
              required
              value={body}
              onChange={this.handleChange}
            />
            <Form.Input
              name="author"
              label="Author"
              placeholder="Author"
              required
              value={author}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Image"
              control={this.dropdownImageSelect}
            />
          </Form.Group>
          <div style={{ display: 'flex' }}>
            <Form.Button color='green'>Submit</Form.Button>
            {this.props.edit ?
              <Form.Button color='red' onClick={this.props.toggleEdit}>Cancel</Form.Button>
              :
              <Form.Button color='red' onClick={this.props.toggle}>Cancel</Form.Button>
            }
          </div>
        </Form>
      </div >
    )
  }
}

export default ReviewForm;