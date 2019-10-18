import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import TripForm from './TripForm'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const TripCreate = ({ user, alert }) => {
  const [trip, setTrip] = useState({ location: '', startDate: '', endDate: '', description: '' })
  const [created, setCreated] = useState(false)

  const handleChange = (event) => {
    event.persist()
    setTrip(trip => ({ ...trip, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { trip }
    })
      .then(responseData => setCreated(responseData.data.trip._id))
      .catch(() => alert({
        heading: 'Danger',
        message: messages.createFailure,
        variant: 'danger'
      }))
  }

  if (created) {
    return <Redirect to={`/trips/${created}`} />
  }

  return (
    <TripForm
      trip={trip}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default TripCreate
