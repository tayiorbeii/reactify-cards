import React, { PropTypes } from 'react';
import { keys } from 'lodash'
import './assets/index.css'

const commonCardClasses = 'relative card'
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
const enhancedInnerClasses = `${commonInnerClasses} overflow-hidden pa4 pointer`
const footerClasses = 'flex justify-between self-stretch items-center' 
const pillClasses = 'f6 lh-title ttu fw6 ph3 pv1 br-pill tracked'
const orangePillClasses = `${pillClasses} orange bg-tag-orange`
const bluePillClasses = `${pillClasses} blue bg-tag-blue`
const greenPillClasses = `${pillClasses} dark-green bg-tag-turquoise tracked`

const cardTypes = {
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${orangePillClasses}`,
    'metaComponent': (meta) => <CourseMeta meta={meta} />
  },
  'lesson': {
    'cardClasses': `${commonCardClasses} card-lesson`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${bluePillClasses}`,
    'metaComponent': (meta) => <LessonMeta meta={meta} />

  },
  'playlist': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`,
    'innerClasses': `${commonInnerClasses}`,
    'pillClasses': `${greenPillClasses}`
  }
}

const titleHeadingClasses = 'f3 tc mt4 mb2 avenir fw5'
const authorNameClasses = 'f6 dark-gray o-50 mb4 tc'

const CourseMeta = ({meta}) => {
  return (
    <div className='f6 dark-gray o-50'>
      {meta.lessonCount} {meta.lessonCount === 1 ? 'Lesson' : 'Lessons'}
    </div>
  )
}
CourseMeta.propTypes = {
  meta: PropTypes.object.isRequired
}


const LessonMeta = ({meta}) => {
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


const MaterialType = ({type}) => {
  return (
    <div className={cardTypes[type]['pillClasses']}>{type}</div> 
  )
}
MaterialType.propTypes = {
  type: PropTypes.string.isRequired
}

const CardFooter = ({meta, type}) => {
  return (
    <div className={footerClasses}>
      {cardTypes[type]['metaComponent'] ? cardTypes[type]['metaComponent'](meta) : null}
      <MaterialType type={type} />
    </div>
  ) 
}
CardFooter.propTypes = {
  meta: PropTypes.object,
  type: PropTypes.string.isRequired
}

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

export const Card = ({title, author, type, meta}) => {
  return (
    <div className={cardTypes[type]['cardClasses']}> 
      <div className={cardTypes[type]['innerClasses']}>
        <CardBody title={title} author={author} />
        <CardFooter type={type} meta={meta} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes)),
  meta: PropTypes.object
}

export const CourseCard = ({title, author, type, meta}) => {
  return (
    <Card title={title} author={author} type='course' meta={meta} />
  )
}
CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes)),
  meta: PropTypes.object
}

export const LessonCard = ({title, author, type, meta}) => {
  return (
    <Card title={title} author={author} type='lesson' meta={meta} />
  )
}
LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes)),
  meta: PropTypes.object
}

export const PlaylistCard = ({title, author, type, meta}) => {
  return (
    <Card title={title} author={author} type='playlist' meta={meta} />
  )
}
PlaylistCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes)),
  meta: PropTypes.object
}
