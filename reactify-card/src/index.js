import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'
import 'tachyons-egghead'
import { StaticCourseCard, StaticLessonCard, StaticPlaylistCard } from './StaticCards'

ReactDOM.render(
  <div className='flex flex-column justify-center items-center content-around bg-dark-navy pv5'>
    <StaticCourseCard />
    <StaticLessonCard />
    <StaticPlaylistCard />
  </div>,
  document.getElementById('root')
);
