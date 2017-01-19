import React, { PropTypes } from 'react'

const VideoLength = ({length}) => {
  return <div className='w3 ml3 tr o-60'>{length}</div>
}

const VideoTitle = ({title}) => {
  return (
      <div className='truncate'>
        {title}
      </div>
  )
}

const CategoryIcon = ({icon}) => {
  return <img src={icon} className='ml2 mt1' alt='' />
}

const PlaylistItem = ({item}) => {
  return (
    <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item'>
      <CategoryIcon icon={item.icon} />
      <div className='ml2 flex justify-between flex-grow-1 lh-copy overflow-hidden o-60 lesson-title'>
        <VideoTitle title={item.title} />
        <VideoLength length={item.length} />
      </div>
    </li>
  )
}

const Playlist = ({playlist}) => {
  console.log(playlist)
  return (
    <div className='pr3 pt3 bg-tag-gray self-stretch h-100 br2 overflow-y-scroll'>
      <ul className='list pa0 ma0 overflow-hidden card-progress-list'>
        {playlist.map((i, k) => <PlaylistItem item={i} key={k} />)}
      </ul>
    </div>
  )
}
Playlist.propTypes ={
  playlist: PropTypes.array.isRequired
}

export default Playlist
