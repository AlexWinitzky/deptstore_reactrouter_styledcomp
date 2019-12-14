import React from 'react';
import axios from 'axios';
import { Icon, Button, Card, } from 'semantic-ui-react';
import ReviewForm from './ReviewForm';
import Review from './Review';


class Reviews extends React.Component {
  state = { reviews: [], showForm: false, key: 0 }

  componentDidMount() {
    const { id } = this.props
    axios.get(`/api/items/${id}/reviews`)
      .then(res => {
        this.setState({ reviews: res.data })
      })
  }

  showForm = () => this.setState({ showForm: !this.state.showForm })

  updateReviewsArray = (data) => {
    const reviews = this.state.reviews.map(r => {
      if (r.id === data.id)
        return data
      return r
    })
    this.setState({ reviews, })
  }

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
    return this.state.reviews.map(r => (
      <Card fluid>
        <Review {...r} deleteReview={this.deleteReview} item_id={this.props.id} updateReviewsArray={this.updateReviewsArray} />
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