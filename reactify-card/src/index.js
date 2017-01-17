import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'
import 'tachyons-egghead'
import { StaticCourseCard, StaticLessonCard, StaticPlaylistCard } from './StaticCards'
import { CourseCard, LessonCard, PlaylistCard } from './Card'

const testData = {
  title: 'Introduction to RxJS Marble Testing Two lines headline',
  author: 'Joe Maddalone',
  meta: {
    lessonCount: 12,
    currentLesson: 7,
    lessonsLeft: 5,
    timeRemaining: '14:34',
    videoLength: '22:22',
    playlist: [
      {
        watched: true,
        current: false,
        icon: '',
        title: 'First Video',
        length: '01:11'
      },
      {
        watched: true,
        current: false,
        icon: '',
        title: 'Second Video',
        length: '02:22'
      },
      {
        watched: false,
        current: true,
        icon: '',
        title: 'Third Video',
        length: '03:33'
      },
      {
        watched: false,
        current: false,
        icon: '',
        title: 'Fourth Video',
        length: '04:44'
      },
      {
        watched: false,
        current: false,
        icon: '',
        title: 'Fifth Video',
        length: '05:55'
      },
      {
        watched: false,
        current: false,
        icon: '',
        title: 'Sixth Video',
        length: '06:06'
      },
      {
        watched: false,
        current: false,
        icon: '',
        title: 'Seventh Video',
        length: '07:07'
      },
    ]
    
  }
}

ReactDOM.render(
  <div className='flex flex-column items-center bg-dark-navy pv5'>
    <div>
      <CourseCard title={testData.title} author={testData.author} />
    </div>
    <div className='mt5'>
      <LessonCard title={testData.title} author={testData.author} />
    </div>
    <div className='mt5'>
      <PlaylistCard title={testData.title} author={testData.author} />
    </div>
    <div className='mt5'>
      <StaticCourseCard />
    </div>
    <div className='mt5'>
      <StaticLessonCard />
    </div>
    <div className='mt5'>
      <StaticPlaylistCard />
    </div>
  </div>,
  document.getElementById('root')
);
