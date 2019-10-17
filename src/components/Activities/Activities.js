import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const Activities = ({ user, match, alert }) => {
  const [activities, setActivities] = useState([])
  // console.log(match)
  // only rerun this if there's this dependency. if you don't include [] it will keep running and rerunning
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/activities`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(responseData => setActivities(responseData.data.activities))
      .catch(() => alert({
        heading: 'Get Failed',
        message: messages.getActivitiesFailure,
        variant: 'danger'
      }))
  }, [])

  const activitiesJsx = activities.map(activity => (
    <li key={activity._id}>
      <Link to={`/trips/${match.params.id}/activities/${activity._id}`}>{activity.activity}</Link>
    </li>
  ))

  return (
    <div>
      <h1>Activities</h1>
      <ul>{activitiesJsx}</ul>
    </div>
  )
}
export default withRouter(Activities)
