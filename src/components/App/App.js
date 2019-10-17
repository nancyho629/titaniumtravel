import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Trips from '../Trip/Trips'
import Trip from '../Trip/Trip'
import TripCreate from '../Trip/TripCreate'
import TripEdit from '../Trip/TripEdit'
import TripHome from '../Trip/TripHome'
import ActivityCreate from '../Activities/ActivityCreate'
import ActivityEdit from '../Activities/ActivityEdit'
import Activity from '../Activities/Activity'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <TripHome />
          )} />
          <Route exact path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips' render={() => (
            <Trips alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute
            user={user}
            exact path='/trips/:id'
            render={() => (
              <Trip
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-trip'
            render={() => (
              <TripCreate
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/trips/:id/edit'
            render={() => (
              <TripEdit
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/trips/:id/create-activity'
            render={(props) => (
              <ActivityCreate
                {...props}
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/trips/:id/activities/:aid/edit-activity'
            render={(props) => (
              <ActivityEdit
                {...props}
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/trips/:id/activities/:aid'
            render={(props) => (
              <Activity
                {...props}
                user={user}
                alert={this.alert}
              />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
