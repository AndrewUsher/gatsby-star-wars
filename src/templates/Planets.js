import React, { Fragment } from 'react'

const Planets = props => {
  return props.pageContext.planets.map(planet => (
    <Fragment key={planet.name}>
      <h2>{planet.name}</h2>
    </Fragment>
  ))
}

export default Planets
