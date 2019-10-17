import React from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ActivityForm = ({ activity, match, tripid, handleChange, handleSubmit }) => {
  const cancelPath = activity._id ? `#/activities/${activity._id}` : `#/trips/${match.params.id}`

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="activity">
        <Form.Label>Activity</Form.Label>
        <Form.Control
          type="text"
          placeholder="text"
          name="activity"
          onChange={handleChange}
          value={activity.activity}
          required
        />
      </Form.Group>
      <Form.Group controlId="Date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          onChange={handleChange}
          value={activity.date}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="text"
          name="description"
          onChange={handleChange}
          value={activity.description}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" href={cancelPath} className="ml2">Cancel</Button>
    </Form>
  )
}

export default withRouter(ActivityForm)
