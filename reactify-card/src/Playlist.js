import React, { PropTypes } from 'react'

const Playlist = ({list}) => {
  console.log(list)
  return (
    <div>
      yo
    </div>
  )
}
Playlist.propTypes ={
  list: PropTypes.object.isRequired
}

export default Playlist
