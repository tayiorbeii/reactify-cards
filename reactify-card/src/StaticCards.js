import React from 'react';
import PlayButton from './PlayButton'
import imgCourseCard from './assets/img-course-card.png'
import imgJs from './assets/js.svg'
import imgRx from './assets/rx.svg'
import imgAngular from './assets/angular.svg'
import './assets/index.css'

const commonCardClasses = 'relative card'
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const playlistCardClasses = `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`

const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
const enhancedInnerClasses = `${commonInnerClasses} overflow-hidden pa4 pointer`

const titleHeadingClasses = 'f3 tc mt4 mb2 avenir fw5'
const authorNameClasses = 'f6 dark-gray o-50 mb4 tc'

const footerClasses = 'flex justify-between self-stretch items-center' 
const pillClasses = 'f6 lh-title ttu fw6 ph3 pv1 br-pill tracked'
const orangePillClasses = `${pillClasses} orange bg-tag-orange`
const bluePillClasses = `${pillClasses} blue bg-tag-blue`
const greenPillClasses = `${pillClasses} dark-green bg-tag-turquoise tracked`

export const Card = () => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
      </div>
    </div>
  )
}

export const StaticCourseCard = () => {
  return (
      <div className={courseCardClasses}>
        <div className={enhancedInnerClasses}>
          <PlayButton hover />
          <div className='mw5 mt3 center ph3'>
            <img alt='' src={imgCourseCard}/>
          </div>
          <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
          <div className={authorNameClasses}>Joe Maddalone</div>
          <div className={footerClasses}>
            <div className='f6 dark-gray o-50'>12 lessons</div>
            <div className={orangePillClasses}>course</div>
          </div>
        </div>
      </div>
  )
}

export const StaticLessonCard = () => {
  return (
    <div className={lessonCardClasses}>
      <div className={enhancedInnerClasses}>
        <PlayButton hover />
        <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
        <div className={authorNameClasses}>Joe Maddalone</div>
        <div className={footerClasses}>
          <div className='flex items-center gray'>
            <img src={imgJs} className='w2' alt=''/>
            <i className='fa fa-clock-o o-60 f5 ml3'></i>
            <div className='w3 ml2 o-60 f6'>22:22</div>
          </div>
          <div className={bluePillClasses}>lesson</div>
        </div>
      </div>
    </div>
  )
}

export const StaticPlaylistCard = () => {
  return (
          <div className={playlistCardClasses}>
        <div className={commonInnerClasses}>
          <div className='relative w-100' style={{
            height: '290px'
          }}>
            <PlayButton />
            <div className='pr3 pt3 bg-tag-gray self-stretch h-100 br2 overflow-y-scroll'>
              <ul className='list pa0 ma0 overflow-hidden card-progress-list'>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item viewed'>
                  <img src={imgRx} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden o-60 lesson-title'>
                    <div className='truncate'>Pick Up Angular 2 in 6 Minutes Pick Up Angular 2 in 6 Minutes</div>
                    <div className='w3 ml3 tr o-60'>02:22</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item viewed'>
                  <img src={imgAngular} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden o-60 lesson-title'>
                    <div className='truncate'>Checking Model Validation in Angular 2</div>
                    <div className='w3 ml3 tr o-60'>22:00</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item next'>
                  <img src={imgJs} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Understand the Angular States of Model Validation in Angular 2</div>
                    <div className='w3 ml3 tr o-60'>04:17</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item'>
                  <img src={imgRx} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Sync Requests with RxJS and Angular</div>
                    <div className='w3 ml3 tr o-60'>31:41</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item'>
                  <img src={imgAngular} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Sync Requests with RxJS and Angular</div>
                    <div className='w3 ml3 tr o-60'>22:22</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item viewed'>
                  <img src={imgJs} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Understand the Angular 2 States of</div>
                    <div className='w3 ml3 tr o-60'>22:22</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item'>
                  <img src={imgRx} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Sync Requests with RxJS and Angular</div>
                    <div className='w3 ml3 tr o-60'>22:22</div>
                  </div>
                </li>
                <li className='flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item'>
                  <img src={imgAngular} className='ml2 mt1' alt=''/>
                  <div className='ml2 flex flex-grow-1 lh-copy overflow-hidden lesson-title'>
                    <div className='truncate'>Sync Requests with RxJS and Angular</div>
                    <div className='w3 ml3 tr o-60'>22:22</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='ph4 pt5 pb4'>
            <div className='tc f6 lh-title light-gray'>14:34 to go (4 more lessons)</div>
            <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
            <div className={authorNameClasses}>Joe Maddalone</div>
            <div className={footerClasses}>
              <div className='flex flex-column items-center'>
                <div className='f6 dark-gray o-50'>
                  <span className='dark-green'>7</span>
                  <span className='mh1'>/</span>
                  <span>12 lessons</span>
                </div>
                <div className='w4 br1 bg-tag-turquoise mt1 overflow-hidden'>
                  <div className='pt1 bg-turquoise' style={{
                    width: '58%'
                  }}></div>
                </div>
              </div>
              <div className={greenPillClasses}>playlist</div>
            </div>
          </div>
        </div>
      </div>
  )
}
