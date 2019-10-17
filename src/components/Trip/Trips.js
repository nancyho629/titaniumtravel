import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { Card, Grid, CardContent, Typography, CardActionArea } from '@material-ui/core'
const moment = require('moment')

const Trips = ({ user, alert }) => {
  const [trips, setTrips] = useState([])
  // only rerun this if there's this dependency. if you don't include [] it will keep running and rerunning
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(responseData => {
        setTrips(responseData.data.trips)
        return responseData
      })
      .then((responseData) => {
        if (responseData.data.trips.length === 0) {
          alert({
            heading: 'Danger',
            message: 'No trips!',
            variant: 'danger' })
        }
      })
      .catch(() => alert({
        heading: 'Danger',
        message: messages.showFailure,
        variant: 'danger'
      }))
  }, [])

  const container = {
    padding: 24
  }

  const tripList = trips.map((trip) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={trip._id}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link to={`/trips/${trip._id}`}>{trip.location} </Link>
              </Typography>
              <Typography variant="h6">
                {moment(trip.startDate).utc().format('MMMM Do YYYY')}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  })

  return (
    <div>
      <h1>Trips</h1>
      {/* <ul>{tripsJsx}</ul> */}
      <div style={container}>
        <Grid container spacing={2}>
          {tripList}
          <Grid item xs={12} sm={6} md={4} lg={3}>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default withRouter(Trips)
