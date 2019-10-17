import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import DatePicker from 'react-date-picker'
// import { KeyboardDatePicker } from '@material-ui/pickers'

const TripForm = ({ trip, handleChange, handleSubmit }) => {
  const cancelPath = trip._id ? `#/trips/${trip._id}` : '#trips'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          onChange={handleChange}
          value={trip.startDate}
        />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          onChange={handleChange}
          value={trip.endDate}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="text"
          name="location"
          onChange={handleChange}
          value={trip.location}
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="text"
          name="description"
          onChange={handleChange}
          value={trip.description}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" href={cancelPath} className="ml2">Cancel</Button>
    </Form>
  )
}

export default TripForm
