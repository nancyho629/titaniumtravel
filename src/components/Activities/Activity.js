import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
const moment = require('moment')
// import Activities from '../Activities/Activities'

const Activity = ({ user, alert, match }) => {
  const [activity, setActivity] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // console.log('props', match)
  // only rerun this if there's this dependency. if you don't include [] it will keep running and rerunning
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips/${match.params.id}/activities/${match.params.aid}`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(responseData => setActivity(responseData.data.activity))
      .catch(() => alert({
        heading: 'Show Failed',
        message: messages.showFailure,
        variant: 'danger'
      }))
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/trips/${match.params.id}/activities/${match.params.aid}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => alert({
        heading: 'Delete Success',
        message: messages.deleteSuccess,
        variant: 'success'
      }))
      .catch(() => alert({
        heading: 'Delete Failed',
        message: messages.deleteFailure,
        variant: 'danger'
      }))
  }
  if (!activity) {
    return <p> Loading... </p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: `/trips/${match.params.id}`, state: { msg: 'Activity successfully deleted' } }
    } />
  }
  return (
    <div>
      <h1>Activity</h1>
      <h3>{activity.activity}</h3>
      <h4>{moment(activity.date).format('MMM Do YYYY')}</h4>
      <h4>{activity.description}</h4>
      <Button href={`#/trips/${match.params.id}`}>Back to all activities</Button>
      <Button href={`#/trips/${match.params.id}/activities/${match.params.aid}/edit-activity`} >Edit this Activity</Button>
      <Button onClick={destroy}>Delete Activity</Button>
    </div>
  )
}
export default withRouter(Activity)
