import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ActivityForm from './ActivityForm'
import { Redirect } from 'react-router-dom'

const ActivityCreate = ({ user, match, alert }) => {
  const [activity, setActivity] = useState({ activity: '', date: '', description: '' })
  const [created, setCreated] = useState(false)

  const handleChange = (event) => {
    event.persist()
    setActivity(activity => ({ ...activity, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/trips/${match.params.id}/activities`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { activity }
    })
      .then(responseData => setCreated(responseData.data.activity._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/trips/${match.params.id}`} />
  }

  return (
    <ActivityForm
      activity={activity}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default ActivityCreate
