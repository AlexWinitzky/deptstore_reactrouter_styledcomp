import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Icon, Button, Card, Rating, Image, } from 'semantic-ui-react';
import ReviewForm from './ReviewForm';


class Reviews extends React.Component {
  state = { reviews: [], showForm: false }

  componentDidMount() {
    const { id } = this.props
    axios.get(`/api/items/${id}/reviews`)
      .then(res => {
        this.setState({ reviews: res.data })
      })
  }

  showForm = () => this.setState({ showForm: !this.state.showForm })

  addReview = (review) => {
    this.setState({ reviews: [review, ...this.state.reviews] })
  }

  renderForm = () => {
    const { showForm } = this.state
    if (showForm)
      return (
        <ReviewForm
          add
          item_id={this.props.id}
          addReview={this.addReview}
          toggle={this.showForm}
        />
      )
    return null
  }

  deleteReview = (r_id) => {
    axios.delete(`/api/items/${this.props.id}/reviews/${r_id}`)
      .then(res => {
        const reviews = this.state.reviews.filter(r => {
          if (r.id !== r_id)
            return r;
        })
        this.setState({ reviews, });
      })
  }


  displayReviews = () => {
    const { item_id } = this.props.id
    return this.state.reviews.map(r => (
      <Card fluid>
        <Card.Content>
          <Rating
            rating={r.rating}
            defaultRating={5}
            maxRating={5}
            disabled
            icon="star"
            size="massive"
          />
        </Card.Content>
        <Card.Content>
          <Image size='small' src={r.image} alt="author" />
          <Card.Header>{r.title}</Card.Header>
          <Card.Description>{r.body}</Card.Description>
          <Card.Meta>{r.author}</Card.Meta>
          <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '10px', width: '100px' }}>
            <Button icon color="red" onClick={() => this.deleteReview(r.id)}>
              <Icon name="trash" />
            </Button>
            <Link to={{
              pathname: `/review/${r.id}/edit`,
              state: {
                item_id: this.props.id,
              }
            }}
            >
              <Button icon color="blue">
                <Icon name="edit" />
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>
    ))
  }

  render() {
    return (
      <div style={{ marginTop: '30px' }}>
        <hr />
        <h1>Product Reviews</h1>
        <Button color='teal' onClick={this.showForm}>
          <Icon name='comment alternate outline' />
          Write a review
        </Button>
        {this.renderForm()}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px' }}>
          <Card.Group itemsPerRow={3}>
            {this.displayReviews()}
          </Card.Group>
        </div>
      </div>
    )
  }
}

export default Reviews