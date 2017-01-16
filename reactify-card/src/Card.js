import React, { PropTypes } from 'react';
import { keys } from 'lodash'
import './assets/index.css'

const commonCardClasses = 'relative card'
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
const enhancedInnerClasses = `${commonInnerClasses} overflow-hidden pa4 pointer`

const cardTypes = {
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`
  },
  'lesson': {
    'cardClasses': `${commonCardClasses} card-lesson`,
    'innerClasses': `${enhancedInnerClasses}`
  },
  'playlist': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`,
    'innerClasses': `${commonInnerClasses}`
  }
}

const titleHeadingClasses = 'f3 tc mt4 mb2 avenir fw5'
const authorNameClasses = 'f6 dark-gray o-50 mb4 tc'

const CardBody = ({title, author}) => {
  return (
    <div>
      <h3 className={titleHeadingClasses}>{title}</h3>
      <div className={authorNameClasses}>{author}</div>
    </div>
  )
}
CardBody.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export const Card = ({title, author, type}) => {
  return (
    <div className={cardTypes[type]['cardClasses']}> 
      <div className={cardTypes[type]['innerClasses']}>
        <CardBody title={title} author={author} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes))
}

export const CourseCard = ({title, author, type}) => {
  return (
    <Card title={title} author={author} type='course' />
  )
}

export const LessonCard = ({title, author, type}) => {
  return (
    <Card title={title} author={author} type='lesson' />
  )
}

export const PlaylistCard = ({title, author, type}) => {
  return (
    <Card title={title} author={author} type='playlist' />
  )
}
