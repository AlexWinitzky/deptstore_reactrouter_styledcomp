import React from "react";
import { Form, Rating, Dropdown } from "semantic-ui-react";
import axios from "axios";

class ReviewForm extends React.Component {
  state = { title: '', body: '', author: '', rating: 0, image: '' }

  componentDidMount() {
    if (!this.props.add) {
    const { id, item_id } = this.props.match.params
      axios.get(`/api/items/${item_id}/reviews/${id}`)
        .then(res => {
          const { title, body, author, rating, image } = res.data
          this.setState({ title, body, author, rating, image })
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
    if (!this.props.add) {
      const { match: { params: { id, item_id } } } = this.props
      axios.put(`/api/items/${item_id}/reviews/${id}`, { ...this.state })
        .then(res => {
          this.props.history.goBack()
        })
    } else {
      const { item_id } = this.props
      axios.post(`/api/items/${item_id}/reviews`, { ...this.state })
        .then(res => this.props.addReview(res.data))
      this.props.toggle()
    }
  }

  render() {
    // const { match: { params: { id } } } = this.props
    const { title, body, author, rating } = this.state
    return (
      <div>
        {/* {id ? <h1>Edit Review</h1> : null} */}
        <Form style={{ marginTop: '10px' }} onSubmit={this.handleSubmit}>
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
          <Form.Group>
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
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ReviewForm;