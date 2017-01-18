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
    langImg: imgJs,
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

## Creating our MaterialMeta Components
Since each Card type has a different set of metadata that it displays, we are going to create a new stateless functional component for each. When they've been created, we'll add each of them to the appropriate type in our `cardTypes` object so we can call them up later.

#### `CourseMeta` Component
Our `CourseCard` is simply a count of the number of lessons. Going off of the markup in `StaticCard.js`'s example, we can see we only need a single `<div>` with some class names. Inside, we'll use curly braces to display `meta.lessonCount`, and then the word "lessons". However, in case there's only one lesson, we'll use a ternary statement to determine if we are going to pluralize or not. Remember to add `meta` as a required PropType.

```javascript
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
```

In order to make our new `CourseMeta` component work when looked up in our `cardTypes` object, we'll create a key for `metaComponent` nested inside of our `course` key's object, and have the value for `metaComponent` be an arrow function that takes `meta` as a parameter and returns our `CourseMeta` component with `meta` as the prop value.

The reason we do this is because our `CourseMeta` component is dynamic based on its props, and we have to be able to pass in our `meta` object.

```javascript
const cardTypes = {
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${orangePillClasses}`,
    'metaComponent': (meta) => <CourseMeta meta={meta} />
  },
```

#### `LessonMeta` and `PlaylistMeta` Components
Creating these components will be much the same as the process we just followed, with some differences of note with our `PlaylistMeta` component.

Our static mockup of the `PlaylistMeta` card has different classes for the footer than our other cards, so we need to modify `cardTypes` object to include a `footerClasses` key for our `playlist` Card, and then update our `CardFooter` subcomponent to look for these additional classes. 

```javascript
const CardFooter = ({meta, type}) => {
  const metaComponent = cardTypes[type].metaComponent ? cardTypes[type].metaComponent(meta) : null
  return (
    <div className={`${footerClasses} ${cardTypes[type]['footerClasses']}`}>
      {metaComponent}
      <MaterialType type={type} />
    </div>
  ) 
}
```

## Next Step
Create `Header` components for our Cards
