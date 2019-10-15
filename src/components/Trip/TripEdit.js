import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import TripForm from './TripForm'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const TripEdit = ({ user, alert, match, history }) => {
  const [trip, setTrip] = useState({ location: '', description: '' })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(res => setTrip(res.data.trip))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setTrip(trip => ({ ...trip, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/trips/${match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { trip }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated a trip!', variant: 'success' }))
      .then(() => history.push(`/trips/${match.params.id}`))
      .then(() => alert({
        heading: 'Update Success',
        message: messages.updateSuccess,
        variant: 'success'
      }))
      .catch(() => alert({ heading: 'Danger', message: 'You did not update a trip!', variant: 'danger' }))
  }

  return (
    <TripForm
      trip={trip}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(TripEdit)
