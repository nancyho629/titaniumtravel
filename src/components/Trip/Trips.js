import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'

const Trips = ({ user, alert }) => {
  const [trips, setTrips] = useState([])
  console.log(user)
  // only rerun this if there's this dependency. if you don't include [] it will keep running and rerunning
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(responseData => setTrips(responseData.data.trips))
      .catch(console.error)
  }, [])

  const tripsJsx = trips.map(trip => (
    <li key={trip._id}>
      <Link to={`/trips/${trip._id}`}>{trip.location}</Link>
    </li>
  ))

  return (
    <div>
      <h1>Trips</h1>
      <ul>{tripsJsx}</ul>
    </div>
  )
}
export default withRouter(Trips)
