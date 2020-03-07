import React, { Fragment } from 'react'

const Films = props => {
  return props.pageContext.films.map(movie => (
    <Fragment key={movie.title}>
      <h2>{movie.title}</h2>
      <h3>Directed by {movie.director}</h3>
      <h3>Produced by {movie.producer}</h3>
    </Fragment>
  ))
}

export default Films
