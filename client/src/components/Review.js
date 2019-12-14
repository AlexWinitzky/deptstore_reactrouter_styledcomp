import React, { useState, } from 'react'
import { Card, Button, Icon, Image, Rating, Segment, } from 'semantic-ui-react'
import ReviewForm from './ReviewForm'
import styled from 'styled-components'

const Review = props => {
  const [toggle, setToggle] = useState(false)
  const { id, image, title, body, author, rating, deleteReview, } = props
  const toggleEdit = () => setToggle(!toggle)

  return (
    toggle ?
      <CustomSegment>
        <ReviewForm {...props} toggleEdit={toggleEdit} edit />
      </CustomSegment>
      :
      <CustomSegment>
        <Card.Content>
          <Rating
            rating={rating}
            defaultRating={5}
            maxRating={5}
            disabled
            icon="star"
            size="massive"
          />
        </Card.Content>
        <Card.Content key={id} >
          <Image size='small' src={image} alt="author" />
          <Card.Header>{title}</Card.Header>
          <Card.Description>{body}</Card.Description>
          <Card.Meta>{author}</Card.Meta>
          <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: '10px', width: '100px' }}>
            <Button icon color="red" onClick={() => deleteReview(id)}>
              <Icon name="trash" />
            </Button>
            <Button icon color="blue" onClick={toggleEdit}>
              <Icon name="edit" />
            </Button>
          </div>
        </Card.Content>
      </CustomSegment>
  )
}

const CustomSegment = styled(Segment)`
  height: 320px;
`
export default Review