# 07. Starting the Footer
The first step in creating our footer is to copy the `footerClasses` and all `pill`-related class name variables from our `StaticCards.js` file into our `Card.js` file.

Now that we have these variables in place, we will create a stateless functional component for our `Footer` that itself will contain stateless functional components for the `MaterialMeta` and `MaterialType` components.

Since our `MaterialType` component will be easier to implement, we'll create it first.

## The `MaterialType` Component
Before we create the `Footer` component, we need to create something to put in it. The `MaterialType` component will be the colored pill that displays the card's type.

Start by adding the appropriate `pillClasses` to our master `cardTypes` object: orange for course, blue for lesson, and green for playlist.

```javascript
  'course': {
    'cardClasses': `${commonCardClasses} card-stacked-shadow card-course`,
    'innerClasses': `${enhancedInnerClasses}`,
    'pillClasses': `${orangePillClasses}`
  }
...
```

With the class names in place, we'll set up our `MaterialType` component to take a single prop for `type`, and return a `<div>` with the appropriate `className` applied. Remember to include `type` in the `propTypes` declaration! 

```javascript
const MaterialType = ({type}) => {
  return (
    <div className={cardTypes[type]['pillClasses']}>{type}</div> 
  )
}
MaterialType.propTypes = {
  type: PropTypes.string.isRequired
}
```

## The `CardFooter` Component
Our `CardFooter` Component follows a similar pattern-- it will take in `meta` and `type` props, and return a `<div>` with the common `footerClasses` applied. Inside of the `div`, we will pass each of the props to their respective subcomponent (again, just the `MaterialType` component for now).

```javascript
const CardFooter = ({meta, type}) => {
  return (
    <div className={footerClasses}>
      <MaterialType type={type} />
    </div>
  ) 
}
CardFooter.propTypes = {
  meta: PropTypes.string,
  type: PropTypes.string.isRequired
}
```

## Updating the `Card`
With the footer created, we need to update the `Card` component to accept `meta` as a prop type & argument, and include our new `CardFooter` subcomponent, passing it `meta` and `type` props.

```javascript
export const Card = ({title, author, type, meta}) => {
  return (
    <div className={cardTypes[type]['cardClasses']}> 
      <div className={cardTypes[type]['innerClasses']}>
        <CardBody title={title} author={author} />
        <CardFooter type={type} meta={meta} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.oneOf(keys(cardTypes)),
  meta: PropTypes.string
}
```

Now when we save our work, our App will reload and show us that we have a footer with our card indicator.

## Next Step
Finish off the `CardFooter` by creating the `MaterialMeta` subcomponent.
