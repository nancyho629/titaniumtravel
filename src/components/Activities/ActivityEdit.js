import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ActivityForm from './ActivityForm'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const ActivityEdit = ({ user, alert, match, history }) => {
  const [activity, setActivity] = useState({ activity: '', date: '', description: '' })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/trips/${match.params.id}/activities/${match.params.aid}`,
      headers: {
        'Authorization': `Token token=${user.token}` // `Bearer ${user.token}`
      }
    })
      .then(res => {
        let formattedDate = ''
        if (res.data.activity.date) {
          const dateObj = new Date(res.data.activity.date)
          formattedDate = dateObj.toISOString().substring(0, 10)
        }
        setActivity({
          ...res.data.activity, date: formattedDate
        })
      })
      .catch(() => alert({
        heading: 'Danger',
        message: messages.showFailure,
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    event.persist()
    setActivity(activity => ({ ...activity, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/trips/${match.params.id}/activities/${match.params.aid}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { activity }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated the activity!', variant: 'success' }))
      .then(() => history.push(`/trips/${match.params.id}/activities/${match.params.aid}`))
      .catch(() => alert({ heading: 'Danger', message: 'You did not update the activity!', variant: 'danger' }))
  }

  return (
    <ActivityForm
      activity={activity}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(ActivityEdit)
