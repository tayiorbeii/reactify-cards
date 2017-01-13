# 04. Starting the Card Component
In the last section, we created a component hierarchy for our cards, and now we will start creating a reusable `Card` component that will eventually replace our example `StaticCard` examples.

## Create the Component
First, we'll create a new file called `Card.js` that will contain our code. Then we'll copy and paste our React and index.css imports out of `StaticCards.js` into our new file. We can also bring over our `commonCardClasses` and `commonInnerClasses` variables, since we'll be using them from the start.

```javascript
import React from 'react'
import './assets/index.css'

const commonCardClasses = 'relative card'
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
```

With our minimum imports and variables in place, we can scaffold our card component. Like our examples in `StaticCards.js`, our new `Card` component will be a stateless functional component that returns an outer `div` with our `commonCardClasses` class names, and inside of it an inner `div` with our `commonInnerClasses` class names. We will export `Card` so we can use it in other files.

```javascript
export const Card = () => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
      </div>
    </div>
  )
}
```

## Update Our Preview
We need to update `index.js` to import our new `Card` component so we can preview it as it changes. We'll start by doing a destructured import of `Card` from the file we just created:

```javascript
import { Card } from './Card'
```

Now let's add a `div` above our `StaticCourseCard` component so we can preview our `Card` as we build it. I'm going to add the class `mt5` to the `div` containing `StaticCourseCard` so we can keep our spacing consistent. 

```javascript
// inside ReactDOM.render
...
    <div>
      <Card />
    </div>
    <div className='mt5'>
      <StaticCourseCard />
    </div>
...
```

Now that we have our pieces in place to have a live preview of our `Card` component as we develop it, we can refresh our page at `http://localhost:3000/`, and we see... nothing.

That's because we haven't actually _put_ anything in our new `Card` yet. 


## Next Step
Since each of our example Cards has the same body, that makes it the perfect starting point for our first shared subcomponent.

