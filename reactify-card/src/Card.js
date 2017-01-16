import React, { PropTypes } from 'react';
import { keys } from 'lodash'
import './assets/index.css'

const commonCardClasses = 'relative card'
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
const enhancedInnerClasses = `${commonInnerClasses} overflow-hidden pa4 pointer`

const types = {
  'course': {
    'cardClasses': 'card-stacked-shadow card-course',
    'innerClasses': `${enhancedInnerClasses}`
  },
  'lesson': {
    'cardClasses': 'card-lesson',
    'innerClasses': `${enhancedInnerClasses}`
  },
  'playlist': {
    'cardClasses': 'card-stacked-shadow sans-serif card-playlist',
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
    <div className={types[type]['cardClasses']}> 
      <div className={types[type]['innerClasses']}>
        <CardBody title={title} author={author} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(types))
}

