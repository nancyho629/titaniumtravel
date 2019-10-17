# Titanium Travel
Titanium Travel is a travel planning tool that allows users to create trips and add activities/places they want to visit in each trip.

- [Titanium Travel Deployed Website](https://nancyho629.github.io/titaniumtravel/#/)
- [Titanium Travel Client Repo](https://github.com/nancyho629/titaniumtravel)
- [Titanium Travel API Repo](https://github.com/nancyho629/titaniumtravel-api)
- [Titanium Travel API Deployed](https://titaniumtravel-api.herokuapp.com/)

## User Stories
As a user, I want to:
* sign up
* sign in
* change my password
* sign out
* create a trip
* edit a trip's location and date
* create an activity that belongs to a trip
* edit the activity
* view all trips
* view all activities that belong to a trip
* delete a trip
* delete an activity

## Technologies Used
* React
* Mongoose
* MongoDB
* Express API
* Node.js
* JavaScript
* Bootstrap

## Future Features
- Google Maps JavaScript API
- Third Party Travel Image API

## Process, Planning, Problem-Solving
I started with the idea of a travel planning web app for an upcoming trip. However, I wanted it to be modeled after AirBnb. Users would have many trips and in each trip you can keep track of the activities and places you want to visit on that trip. For example, if you're traveling to Bangkok, Thailand you might want to visit The Grand Palace, Terminal 21, and Erawan Temple. These activities would be in cards on the right and mapped out on Google Maps on the left. To scale it back however to meet MVP I made sure I could first create trips and added the additional resource of activities to the trips.

## Setup and Installation
1. `npm install `
2. `npm i @materials-ui`
3. `npm install momentjs`

## Screenshot
![Titanium Travel Screenshot](./public/TT)
## Wireframes
![Titanium Travel wireframe3](./public/wireframe3)
![Titanium Travel wireframe2](./public/wireframe2)
![Titanium Travel wireframe1](./public/wireframe1)

## Routes
|  Verb |  Route |
|-------|--------|
| POST   | `/sign-up`  |
| POST   | `/sign-in`  |
| DELETE  | `/sign-out`  |
| PATCH   | `/change-password`  |
| GET   | `/trips`  |
| POST   | `/trips`  |
| GET   | `/trips/:id`  |
| PATCH  | `/trips/:id`  |
| DELETE  | `/trips/:id` |
| POST  |  `/trips/:id/activities` |
| PATCH  | `/trips/:id/activities/:aid`  |
| GET  | `/trips/:id/activities/:aid`  |
| GET   | `/trips/:id/activities/:aid`  |
| DELETE   | `/trips/:id/activities/:aid`  |
