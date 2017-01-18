import React, { PropTypes } from 'react';
import { keys } from 'lodash'
import PlayButton from './PlayButton'
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
    'metaComponent': (meta) => <CourseMeta meta={meta} />,
    'headerComponent': (meta) => <CourseHeader meta={meta} />
  },
  'lesson': {
    'cardClasses': `${commonCardClasses} card-lesson`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${bluePillClasses}`,
    'metaComponent': (meta) => <LessonMeta meta={meta} />,
    'headerComponent': (meta) => <LessonHeader meta={meta} />


  },
  'playlist': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`,
    'innerClasses': `${commonInnerClasses}`,
    'pillClasses': `${greenPillClasses}`,
    'footerClasses': 'pb4 ph4',
    'metaComponent': (meta) => <PlaylistMeta meta={meta} />,
    'headerComponent': (meta) => <PlaylistHeader meta={meta} />
  }
}

const titleHeadingClasses = 'f3 tc mt4 mb2 avenir fw5'
const authorNameClasses = 'f6 dark-gray o-50 mb4 tc'

const CourseMeta = ({meta}) => {
  return (
    <div className='f6 dark-gray o-50'>
      {meta.lessonCount} {meta.lessonCount === 1 ? 'lesson' : 'lessons'}
    </div>
  )
}
CourseMeta.propTypes = {
  meta: PropTypes.object.isRequired
}

const CourseHeader = ({meta}) => {
  return (
    <div>
      <PlayButton hover />
      <div className='mw5 mt3 center ph3'>
        <img alt='' src={meta.courseImg} />
      </div>
    </div>
  )
}
CourseHeader.propTypes = {
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

const LessonHeader = ({meta}) => {
  return <PlayButton hover />
}
LessonHeader.propTypes = {
  meta: PropTypes.object.isRequired
}

const PlaylistMeta = ({meta}) => {
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

const PlaylistHeader = ({meta}) => {
  const { timeRemaining, lessonsLeft } = meta
  return (
    <div>
      <div className='relative w-100' style={{
        height: '290px'
      }}>
        <PlayButton />
      </div>
      <div className='ph4 pt5'>
        <div className='tc f6 lh-title light-gray'>
          {`${timeRemaining} to go (${lessonsLeft} more ${lessonsLeft === 1 ? 'lesson' : 'lessons'})`}
        </div>
      </div>
    </div>
  )
}
PlaylistHeader.propTypes = {
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

const CardHeader = ({meta, type}) => {
  const headerComponent = cardTypes[type].headerComponent ? cardTypes[type].headerComponent(meta) : null
  return (
    <div>
      {headerComponent}
    </div>
  )  
}
CardHeader.propTypes = {
  meta: PropTypes.object,
  type: PropTypes.string.isRequired
}


const CardFooter = ({meta, type}) => {
  const metaComponent = cardTypes[type].metaComponent ? cardTypes[type].metaComponent(meta) : null
  return (
    <div className={`${footerClasses} ${cardTypes[type]['footerClasses']}`}>
      {metaComponent}
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
        <CardHeader type={type} meta={meta} />
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
