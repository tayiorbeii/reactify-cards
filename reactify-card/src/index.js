import React from 'react';
import ReactDOM from 'react-dom';
import { StaticCourseCard, StaticLessonCard, StaticPlaylistCard } from './StaticCards'
import 'tachyons-egghead'
import 'font-awesome/css/font-awesome.css'

ReactDOM.render(
  <div className='flex flex-column justify-center items-center content-around bg-dark-navy pv5'>
    <StaticCourseCard />
    <StaticLessonCard />
    <StaticPlaylistCard />
  </div>,
  document.getElementById('root')
);
