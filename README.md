# 05. Card Type Awareness
We've made progress on a generic `Card` component with a `CardBody` subcomponent, but now we will turn our attention toward creating our `CourseCard`, `LessonCard`, and `PlaylistCard` components.

## Preparation
In the first couple stages of this project, we went through our markup and extracted common and unique `className`s for each of our cards. Each of our Card types has its own outer, inner, and footer styles.

In order to keep ourselves organized, we'll set up a master `cardTypes` object to hold the settings for each of our `Card` variations.

One of the tools we'll use to help us is `keys` from the `lodash` library. We need to add it to our project...

```
npm install --save lodash
```

...and then import it at the top of `Cards.js`:

```javascript
import { keys } from 'lodash'
```

## Building the `cardTypes` Object
Putting together our `cardTypes` object should be pretty straight forward-- we will have a key for each type (`course`, `lesson`, `playlist`). For now, each entry will track which `cardClasses` and `innerClasses` each type of `Card` will use. We will add to this master object as our work continues.

We'll build our `cardTypes` object in our `Card.js` file, and fill it out using the additional class names from each card in `StaticCards.js`.

Since each of our Card types use their own classes in addition to the `commonCardClasses`, we'll just migrate each of these away from their separate variables in our `StaticCards.js` example file into their respective `cardClasses` entry in our `cardTypes` object. As far as `innerClasses` go, we'll set the value to be a string template for the appropriate variable. 

```javascript
const types = {
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`
  },
  'lesson': {
    'cardClasses': `${commonCardClasses} card-lesson`,
    'innerClasses': `${enhancedInnerClasses}`
  },
  'playlist': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`,
    'innerClasses': `${commonInnerClasses}`
}
```

With our `types` object set up, we can move on to updating our `Card` component.

## Adding `type` Prop to `Card`
In our `Card.propTypes` declaration, we'll add a `type` key below our `title` and `author` propTypes. Our new `type` prop will be one of the keys present in our `types` object. To translate this into the form that React understands, we'll write it as:

```javascript
type: PropTypes.oneOf(keys(types))
```

## Refactoring `Card`
We'll start by adding `type` as one of the destructured parameters where we create the `Card` component. With this in place, we can refactor our `className`s to perform a lookup in our `cardTypes` object using the `type` we've passed in to `Card` to choose the correct classes.

Our `Card` component should now look like this:
```javascript
export const Card = ({title, author, type}) => {
  return (
    <div className={cardTypes[type]['cardClasses']}> 
      <div className={cardTypes[type]['innerClasses']}>
        <CardBody title={title} author={author} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes))
}
```

## Checking Our Work
In order to see the changes we've made, we need to update `index.js` to pass a `type` into our `Card` component:

```javascript
// Inside index.js
<Card title={testData.title} author={testData.author} type='course' />
```

Our Course card is starting to take shape! However, since we only have a few different types of Card, it would be nice to not have to pass a `type` every time and just instantiate the type of card we want right off the bat.

## Creating `CourseCard`, `LessonCard`, and `PlaylistCard`
At the bottom of our `Card.js` file, we'll export stateless functional components for each of our Card types. They'll all follow roughly the same layout, with the name and `type` adjusted appropriately:
```javascript
export const CourseCard = ({title, author, type}) => {
  return (
    <Card title={title} author={author} type='course' />
  )
}
```

Jumping back to our App's `index.js` file, we'll adjust our import to bring in our separate Cards, and remove the generic `Card`:
```javascript
import { CourseCard, LessonCard, PlaylistCard } from './Card'
```

We also will adjust our our rendered preview to display all three of our cards:

```javascript
// inside the ReactDOM.render return
<div>
  <CourseCard title={testData.title} author={testData.author} />
</div>
<div className='mt5'>
  <LessonCard title={testData.title} author={testData.author} />
</div>
<div className='mt5'>
  <PlaylistCard title={testData.title} author={testData.author} />
</div>
```

Now when we look at our example app, we can see our three dynamic Card examples are on their way to looking like their static counterparts!

## Next Step
Start building the `CardFooter` component
