# 02. Creating the Play Button

We've cleaned up our code quite a bit by extracting repeatedly used classes into varaibles, but now the markup for our play button variations look like this:

```javascript
<div className={playBtnClasses}></div>
<div className={hoverPlayBtnClasses}></div>
```

We know from our repeated `className`s that we have a base button with a variation applied to it. With that in mind, we will create a `<PlayButton />` component with a `hover` variant that will be activated via a prop passed into the component.

In a new file called `PlayButton.js`, we will migrate over the appropriate lines of code from `StateCards.js`. Since our component will make use of props, we need to add `PropTypes` as a destructured import from React:

```javascript
import React, { PropTypes } from 'react'

const commonPlayBtnClasses = 'fa fa-play w3 h3 f3 absolute z-1 gray items-center justify-center br-pill pointer card-play-btn'
const hoverPlayBtnClasses = `${commonPlayBtnClasses} bg-white-70 o-0`
const playBtnClasses = `${commonPlayBtnClasses} hover-turquoise bg-white`
```

With our button prerequisites in place, we can write the stateless functional component for the `PlayButton`. The `hover` prop is a boolean that we will set to be false by default, meaning that we will have to specify if we want to use that variation.

Recall that our button markup was in a single `<div>`, so all we need to return is a self-closing `<div />` with the appropriate `className`s applied.

Since we have only two variations of the `PlayButton` we will use a ternary statement to decide which of our `className` variables to use. Our ternary statment will say "if this is the `hover` variation, use the `hoverPlayBtnClasses`, otherwise use the regular `playBtnClasses`".

We can write our ternary statement directly into the `className` declaration inside of the `<div />` we are returning.

```javascript
const PlayButton = ({ hover=false }) => {
    return <div className={hover ? hoverPlayBtnClasses : playBtnClasses} />
}

PlayButton.propTypes = {
  hover: PropTypes.bool  
}
```

Now that our `PlayButton` component is complete, we will make it the default export for our file:

```javascript
export default PlayButton
```

With this file complete, we can now go back to our `StaticCards.js` file and import our newly created `PlayButton`:

```javascript
// inside StaticCards.js

import PlayButton from './PlayButton'
```

We can also remove the class name variables related to the `PlayButton`.  
In order to use our new component, we just replace our previous markup like so:

```javascript
// Old:
<div className={playBtnClasses}></div>

// New:
<PlayButton />
```

Since the `hover` prop on our `PlayButton` is a boolean, if we want to use that button variation, we can simply add the word to use that variation:

```javascript
<PlayButton hover />
```

One component extracted, several more to go!

## Next Step
Applying the concepts of ["Thinking in React"](https://facebook.github.io/react/docs/thinking-in-react.html) to determine our component hierarchy.

