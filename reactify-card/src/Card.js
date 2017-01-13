import React from 'react';
import './assets/index.css'

const commonCardClasses = 'relative card'
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'

const titleHeadingClasses = 'f3 tc mt4 mb2 avenir fw5'
const authorNameClasses = 'f6 dark-gray o-50 mb4 tc'

export const Card = () => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
        <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
        <div className={authorNameClasses}>Joe Maddalone</div>
      </div>
    </div>
  )
}

