import React from 'react';
import './assets/index.css'

const commonCardClasses = 'relative card'
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'

export const Card = () => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
      </div>
    </div>
  )
}


