import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'
import 'tachyons-egghead'
import { StaticCourseCard, StaticLessonCard, StaticPlaylistCard, Card } from './StaticCards'

ReactDOM.render(
  <div className='flex flex-column items-center bg-dark-navy pv5'>
    <div>
      <Card />
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
