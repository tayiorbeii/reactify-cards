# 08. Finishing the Footer

## Adding Mock Meta Data
In order to display meta data on our cards, we should start by creating some.

For the purposes of this demo, we'll just add some to our `testData` in our `index.js` file, using the stuff we can see in our `StaticCard` examples as a guide. We'll also import our image assets for passing to the cards.

```javascript
import imgCourseCard from './assets/img-course-card.png'
import imgJs from './assets/js.svg'
import imgRx from './assets/rx.svg'

const testData = {
  title: 'Introduction to RxJS Marble Testing Two lines headline',
  author: 'Joe Maddalone',
  meta: {
    courseImg: imgCourseCard,
    lessonCount: 12,
    currentLesson: 7,
    lessonsLeft: 5,
    timeRemaining: '14:34',
    videoLength: '22:22',
    playlist: [
      {
        watched: true,
        current: false,
        icon: imgRx,
        title: 'First Video',
        length: '01:11'
      },
    ...
```

## Update Components to Accept `meta`

With our metadata in place, we can pass it in as the `meta` prop on each of our `Card` variations, like so:

```javascript
// inside index.js

<CourseCard title={testData.title} author={testData.author} meta={testData.meta} />
```

Now we need to update each of our individual `Card` components to use the `meta` prop. For example:
```javascript
export const CourseCard = ({title, author, type, meta}) => {
  return (
    <Card title={title} author={author} type='course' meta={meta} />
  )
}
```



## Next Step
Add the `PlayButton` component to our `Card` component
