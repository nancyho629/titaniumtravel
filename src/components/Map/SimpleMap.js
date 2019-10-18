import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>
const boston = {
  center: {
    lat: 42.36,
    lng: -71.03
  }
}

const SimpleMap = ({ center, zoom, text }) => (
  // Important! Always set the container height explicitly
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDi-0c0-cAuUbw9uOXJRhF1SgyJeyXel4M ' }}
      defaultCenter={boston}
      center={center}
      defaultZoom={zoom}
    >
      <AnyReactComponent lat={center.lat} lng={center.lng} text={text} />
    </GoogleMapReact>
  </div>
)

export default SimpleMap
