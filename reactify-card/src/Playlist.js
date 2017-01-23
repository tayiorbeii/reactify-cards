import React, { PropTypes } from 'react'
import PlayButton from './PlayButton'
import { Card } from './Card'

const VideoLength = ({length}) => {
  return <div className='w3 ml3 tr o-60'>{length}</div>
}
VideoLength.propTypes = {
  length: PropTypes.string.isRequired
}

const VideoTitle = ({title}) => {
  return (
      <div className='truncate'>
        {title}
      </div>
  )
}
VideoTitle.propTypes = {
  title: PropTypes.string.isRequired
}

const CategoryIcon = ({icon}) => {
  return <img src={icon} className='ml2 mt1' alt='' />
}

const PlaylistItem = ({item}) => {
  const { watched, current, icon, title, length } = item
  const liClasses = 'flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item' 
  const textClasses = 'ml2 flex justify-between flex-grow-1 lh-copy overflow-hidden lesson-title'

  const watchedClasses = 'viewed o-60'
  const watchedTitleClasses = 'o-60'
  const currentClasses = 'next'

  return (
    <li className={`${liClasses} ${watched ? watchedClasses : null} ${current ? currentClasses : null}`}>
      <CategoryIcon icon={icon} />
      <div className={`${textClasses} ${watched ? watchedTitleClasses : null}`}>
        <VideoTitle title={title} />
        <VideoLength length={length} />
      </div>
    </li>
  )
}
PlaylistItem.propTypes = {
  item: PropTypes.object.isRequired
}

const Playlist = ({playlist}) => {
  return (
    <div className='pr3 pt3 bg-tag-gray self-stretch h-100 br2 overflow-y-scroll'>
      <ul className='list pa0 ma0 overflow-hidden card-progress-list'>
        {playlist.map((i, k) => <PlaylistItem item={i} key={k} />)}
      </ul>
    </div>
  )
}
Playlist.propTypes = {
  playlist: PropTypes.array.isRequired
}

export const PlaylistCard = ({title, author, meta}) => {
  return (
    <Card title={title} author={author} type='playlist' meta={meta} />
  )
}
PlaylistCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  meta: PropTypes.object
}

export const PlaylistMeta = ({meta}) => {
  return (
    <div className='flex flex-column items-center'>
      <div className='f6 dark-gray o-50'>
        <span className='dark-green'>{meta.currentLesson}</span>
        <span className='mh1'>/</span>
        <span>{meta.lessonCount} {meta.lessonCount === 1 ? 'lesson' : 'lessons'}</span>
      </div>
      <div className='w4 br1 bg-tag-turquoise mt1 overflow-hidden'>
        <div className='pt1 bg-turquoise' style={{
          width: `${Math.round((meta.currentLesson / meta.lessonCount) * 100)}%`
        }} />
      </div>
    </div>
  )
}
PlaylistMeta.propTypes = {
  meta: PropTypes.object.isRequired
}

const PlaylistSummary = ({timeRemaining, lessonsLeft}) => {
  return (
    <div className='ph4 pt5'>
      <div className='tc f6 lh-title light-gray'>
        {`${timeRemaining} to go (${lessonsLeft} more ${lessonsLeft === 1 ? 'lesson' : 'lessons'})`}
      </div>
    </div>
  )
}
PlaylistSummary.propTypes = {
  timeRemaining: PropTypes.string.isRequired,
  lessonsLeft: PropTypes.number.isRequired
}

export const PlaylistHeader = ({meta}) => {
  const { timeRemaining, lessonsLeft } = meta
  return (
    <div>
      <div className='relative w-100' style={{
        height: '290px'
      }}>
        <PlayButton />
        <Playlist playlist={meta.playlist} />
      </div>
      <PlaylistSummary timeRemaining={timeRemaining} lessonsLeft={lessonsLeft} />
    </div>
  )
}
PlaylistHeader.propTypes = {
  meta: PropTypes.object.isRequired
}

export default Playlist

