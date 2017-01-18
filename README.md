# 09. Creating Header Components

Let's start with a `CardHeader` stateless functional component modeled after our `CardFooter`. It will be a stateless functional component that will look up the `type` in our `cardTypes` object, and return the appropriate `headerComponent`, which we will create and add to the `cardTypes` entry.

```javascript
const CardHeader = ({meta, type}) => {
  const headerComponent = cardTypes[type].headerComponent ? cardTypes[type].headerComponent(meta) : null
  return (
    <div>
      {headerComponent}
    </div>
  )  
}
```

Now we can add it to our `Card` component:
```javascript
// inside the `Card` component
    
<div className={cardTypes[type]['innerClasses']}>
  <CardHeader type={type} meta={meta} />
  <CardBody title={title} author={author} />
  <CardFooter type={type} meta={meta} />
</div>
```

## Creating `CourseHeader` & `LessonHeader`
Our `CourseHeader` component will contain an image that we'll get from `meta`, along with our `PlayButton` component that we created earlier. We can just copy the structure and styles from the example in `StaticCards.js`. After we create the component, we'll add it to the `course` section in our `cardTypes` object.

```javascript
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
```

```javascript
const cardTypes = {
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${orangePillClasses}`,
    'metaComponent': (meta) => <CourseMeta meta={meta} />,
    'headerComponent': (meta) => <CourseHeader meta={meta} />
  },
...
```

Since we've already laid the groundwork for our `CardHeader`, as soon as we save the file our App should update to show us the header image.

Our `LessonHeader` component is much the same as our `CourseHeader`, except it will only return the `PlayButton` component.

## Starting the `PlaylistHeader` Component
There's a lot more going on in the header of our `PlaylistCard` than any of the others (i.e. there's a whole playlist there!)... but in the meantime, we can add the `PlayButton` and remaining time subcomponents.

Like the others, we'll start with a stateless functional component with a destructured `meta` parameter. Inside of our function, we'll destructure variables for `timeRemaining` and `lessonsLeft` from `meta` in order to render our playlist time left info. Looking at our mockup in `StaticCards.js`, we need to transfer over the class names and inline style from the `<div>` surrounding our `PlaylistButton` and the playlist entries.

Inside of this new `<div>` and below our `<PlayButton />`, we will create our "remaining time" line using our `timeRemaining` and `lessonsLeft` variables, again making use of a ternary statement to determine if we will be pluralizing the word "lesson" or not.

```javascript
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
```

Again, remember to declare propTypes for our `PlaylistHeader` and add it to the right part of our `cardTypes` object.

Saving the file, you should see our `PlaylistHeader` is starting to look like the mockup.

## Next Step
The time has come to create our most complex component: the playlist.



