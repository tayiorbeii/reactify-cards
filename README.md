# 04. Creating the CardBody subcomponent

Inside of each of our example cards inside of `StaticCards.js`, we have the same title `h3` and author name `div` in each of our cards. Let's copy and paste these two lines out of `StaticCourseCard` and into our `Card` component inside of the inner `div` of `Card.js`. We will also need to bring over our `titleHeadingClasses` and `authorNameClasses` variables.


```javascript
// inside our Card component
...
      <div className={commonInnerClasses}>
        <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
        <div className={authorNameClasses}>Joe Maddalone</div>
      </div>
...
```

After saving the file, our preview app will reload, and we'll see that we have our title and author lines being displayed in a really wide Card (don't worry, we'll tackle the styling later).

## Extract Title & Author into CardBody Component
Our first pass at the `CardBody` component will contain the same hardcoded title and author as our examples. We'll start by declaring another stateless functional component called `CardBody` that doesn't take any parameters (_yet!_) and returns a `div` containing our title `h3` and author `div` lines.

A couple things of note: we're not using the `export` keyword for our `CardBody` because we aren't going to use it in any other files. Also, we need to surround our title and author lines inside of a `div` because "adjacent JSX elements must be wrapped in an enclosing tag" (I can't say it better than the error message!)

```javascript
const CardBody = () => {
  return (
    <div>
      <h3 className={titleHeadingClasses}>Introduction to RxJS Marble Testing Two lines headline</h3>
      <div className={authorNameClasses}>Joe Maddalone</div>
    </div>
  )
}
```

Now that we've created our `CardBody` component, we can replace these two lines in our `Card` component:

```javascript
...
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
        <CardBody />
      </div>
    </div>
...
```

As expected, our new `Card` preview looks the same, which means it worked! Now let's make the title and author display what is passed to them via props.

## Prepare CardBody for Props
To alter our `CardBody` component to accept props for title and author, we'll first need to add `PropTypes` as a destructured import from React at the top of our file:

```javascript
import React, { PropTypes } from 'react'
```

Now below our `CardBody` component, we add a declaration of the prop names & types that the component should expect. Title & author will both be strings, and we'll set both of them to be required.

```javascript
CardBody.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}
```

The next step is to update the `CardBody` component to actually accept these props. We'll start by destructuring `title` and `author` from the parameters passed into the functional component. Then we replace our hardcoded strings with our variables surrounded by curly braces.

```javascript
const CardBody = ({title, author}) => {
  return (
    <div>
      <h3 className={titleHeadingClasses}>{title}</h3>
      <div className={authorNameClasses}>{author}</div>
    </div>
  )
}
```

With that change in place, we now need to update our `<CardBody />` inside of the `Card` component to pass `title` and `author` props:

```javascript
...
  <CardBody title='Test Title' author='Test Author' />
...
```

After saving the file, the preview of our new `Card` component should now display "Test Title" and "Test Author".

## Passing Props Through
Now that we know our `CardBody` component is working, let's refactor our code to allow us to pass the `title` and `author` through our `Card` component. We'll do this by following pretty much the same process that we just did: Add `propTypes` to our `Card` component, have it destructure `title` and `author` from its params.


