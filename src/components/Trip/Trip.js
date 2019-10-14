import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Trip = ({ user, alert, match }) => {
  console.log(match)
  const [trip, setTrip] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // only rerun this if there's this dependency. if you don't include [] it will keep running and rerunning
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(responseData => setTrip(responseData.data.trip))
      .then(console.log(trip))
      .catch(console.error)
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/trips/${match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  if (!trip) {
    return <p> Loading... </p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Trip successfully deleted' } }
    } />
  }
  return (
    <div>
      <h1>Trip</h1>
      {trip.title}
      <Link to="/trips">Back to all trips</Link>
      <Button href={`#/trips/${match.params.id}/edit`} >Edit this trip</Button>
      <Button onClick={destroy}>Delete Trip</Button>
    </div>
  )
}
export default withRouter(Trip)
