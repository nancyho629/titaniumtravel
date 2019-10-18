import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import { Card, Grid, CardContent, Typography } from '@material-ui/core'
const moment = require('moment')

const Trip = ({ user, alert, match }) => {
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

      .catch(() => alert({
        heading: 'Show Failed',
        message: messages.showFailure,
        variant: 'danger'
      }))
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/trips/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => alert({
        heading: 'Success',
        message: messages.deleteSuccess,
        variant: 'success'
      }))
      .catch(() => alert({
        heading: 'Danger',
        message: messages.deleteFailure,
        variant: 'danger'
      }))
  }
  if (!trip) {
    return <p> Loading... </p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/trips', state: { msg: 'Trip successfully deleted' } }
    } />
  }

  const container = {
    padding: 24
  }

  const activityList = trip.activities.map(activity => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={activity._id}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              <Link to={`/trips/${match.params.id}/activities/${activity._id}`}>{activity.activity} </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  })

  return (
    <div>
      <h1>Trip</h1>
      <h2>{trip.location}</h2>
      <h3>{trip.description}</h3>
      <h4>{moment(trip.startDate).format('MMMM Do YYYY')} - {moment(trip.endDate).format('MMMM Do YYYY')}</h4>
      <Button href={'#/trips/'}>Back to all trips</Button>
      <Button href={`#/trips/${match.params.id}/edit`} >Edit this trip</Button>
      <Button onClick={destroy}>Delete Trip</Button>
      <h2>Activities</h2>
      <Button href={`#/trips/${match.params.id}/create-activity`}>Add a new activity</Button>
      <div style={container}>
        <Grid container spacing={2}>
          {activityList}
          <Grid item xs={12} sm={6} md={4} lg={3}>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default withRouter(Trip)
