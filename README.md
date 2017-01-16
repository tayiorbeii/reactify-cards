# 05. Card Type Awareness
We've made progress on a generic `Card` component with a `CardBody` subcomponent, but now we will turn our attention toward creating our `CourseCard`, `LessonCard`, and `PlaylistCard` components.

## Preparation
In the first couple stages of this project, we went through our markup and extracted common and unique `className`s for each of our cards. Each of our Card types has its own outer, inner, and footer styles.

In order to keep ourselves organized, we'll set up a master `types` object to hold the settings for each of our `Card` variations.

One of the tools we'll use to help us is `keys` from the `lodash` library. We need to add it to our project...

```
npm install --save lodash
```

...and then import it at the top of `Cards.js`:

```javascript
import { keys } from 'lodash'
```

## Building the `types` Object
Putting together our `types` object should be pretty straight forward-- we will have a key for each type (`course`, `lesson`, `playlist`). For now, each entry will track which `cardClasses` and `innerClasses` each type of `Card` will use. We will add to this master object as our work continues.

We'll build our `types` object in our `Card.js` file, and fill it out using the additional class names from each card in `StaticCards.js`.

Since each of our Card types use their own classes in addition to the `commonCardClasses`, we'll just move each of these to their respective `innerClasses`. As far as `innerClasses` go, we'll set the value to be a string template for the appropriate variable. 

```javascript
const types = {
  'course': {
    'cardClasses': 'card-stacked-shadow card-course',
    'innerClasses': `${enhancedInnerClasses}`
  },
  'lesson': {
    'cardClasses': 'card-lesson',
    'innerClasses': `${enhancedInnerClasses}`
  },
  'playlist': {
    'cardClasses': 'card-stacked-shadow sans-serif card-playlist',
    'innerClasses': `${commonInnerClasses}`
  }
}
```

With our `types` object set up, we can move on to updating our `Card` component.

## Adding `type` Prop to `Card`
In our `Card.propTypes` declaration, we'll add a `type` key below our `title` and `author` propTypes. Our new `type` prop will be one of the keys present in our `types` object. To translate this into the form that React understands, we'll write it as:

```javascript
type: PropTypes.oneOf(keys(types))
```

## Refactoring `Card`
We'll start by adding `type` as one of the destructured parameters where we create the `Card` component. With this in place, we can refactor our `className`s to perform a lookup in our `types` object using the `type` we've passed in to `Card` to choose the correct classes.

```javascript

```


