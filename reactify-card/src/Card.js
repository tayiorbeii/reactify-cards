import React, { PropTypes } from 'react';
import './assets/index.css'

const commonCardClasses = 'relative card'
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'

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

export const Card = ({title, author}) => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
        <CardBody title={title} author={author} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

