import React, { PropTypes } from 'react'
import PlayButton from './PlayButton'
import { Card } from './Card'

export const LessonMeta = ({meta}) => {
  return (
    <div className='flex items-center gray'>
      <img src={meta.langImg} className='w2' alt='' />
      <i className='fa fa-clock-o o-60 f5 ml3' />
      <div className='w3 ml2 o-60 f6'>{meta.videoLength}</div>
    </div>
  )
}
LessonMeta.propTypes = {
  meta: PropTypes.object.isRequired
}

export const LessonHeader = ({meta}) => {
  return <PlayButton hover />
}
LessonHeader.propTypes = {
  meta: PropTypes.object.isRequired
}

export const LessonCard = ({title, author, type, meta}) => {
  return (
    <Card title={title} author={author} type='lesson' meta={meta} />
  )
}
LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  meta: PropTypes.object
}

