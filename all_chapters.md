# 00. The Starting Point

## Intro
After cloning this directory, run `npm start` from inside of the `reactify-card` directory. Now when you visit `http://localhost:3000`, you will see three different Cards, the source code for which can be found in `./reactify-card/src/StaticCards.js`.

For the most part, these cards have been marked up in standard HTML, but with some minimal changes to make them play nicely within a React project.

* Each card has been put into its own stateless functional component, which are `export`ed out of `StaticCards.js` and `import`ed into `App.js`.
* Image assets are imported and given variable names at the top of the file, and then referenced like so: `<img src={imgCourseCard} />` (In React, curly braces are used when dealing with variables).
* React uses `className` in its markup rather than `class` (Many of the class names in use are provided via [`tachyons-egghead`](https://github.com/eggheadio/tachyons-egghead/), a compilation of customized [Tachyons](http://tachyons.io) styles)

# 01. DRY Out Markup

To start to DRY (Don't Repeat Yourself) out our markup, we'll look for `className`s in our markup that are being reused multiple times, and replace them with variable assignments. This is good to do, because if we decide to change something later on, we only have to change it in one place.

To start, notice that all of the cards begin with `<div className='relative card ...'>`. We can create a constant `commonCardClasses` for these two classes at the top of our file:

```javascript
const commonCardClasses = 'relative card'
```

After pulling out the common classes, I like to use ES6 Template Literals to interpolate the other required classes into a single variable. So, looking at our three card examples, I come up with the following:

```javascript
const courseCardClasses = `${commonCardClasses} card-stacked-shadow card-course`
const lessonCardClasses = `${commonCardClasses} card-lesson`
const playlistCardClasses = `${commonCardClasses} card-stacked-shadow sans-serif card-playlist`
```

Now that we've declared variables for each, we can replace the repeated strings. Remember to use curly braces instead of quotes since we're using variables. After you've replaced these classes, the cards should look exactly the same.

We can give the same treatment to the common "inner" card classes. All three of our example cards have the following "inner" card classes:
```javascript
flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner
```

Our Course and Lesson cards also feature these additional inner classes:

```javascript
overflow-hidden pa4 pointer
```

Following the pattern of above, we will create variables for our common inner classes.
```javascript
const commonInnerClasses = 'flex flex-column items-center br2 bg-white navy relative z-1 card-course-inner'
const enhancedInnerClasses = `${commonInnerClasses} overflow-hidden pa4 pointer`
```

_The Course and Lesson cards have additional classes that enhance the common inner classes, hence the name. Sometimes naming things is hard._

There are many more areas where `classNames` are repeated: The button that shows when hovering over a card, the title and author typography, the card footers... Following the pattern of replacing instances of duplication with a resuable variable goes a long way in cleaning up presentational markup!


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

# 03. Planning Our Components

In order to form our plan of attack, let's do the component hierarchy excercise featured in Facebook's ["Thinking in React"](https://facebook.github.io/react/docs/thinking-in-react.html) article. This exercise is useful not only to help you visualize how your components fit together, but also to help you come up with names for the subcomponents.

This can be done with any software that allows you to annotate an image (I'm using Preview, that ships by default in Mac OS).

The first step is to [break each card into common parts](./allcards.png), and then drill down from there. Each Card has the same basic attributes (e.g. white background, rounded corners), and will have its sections annotated in different colors. In this case, I'm using neon pink for the card's header, neon green for the body, and neon blue for the footer.

## Card Header (Neon Pink)
In our Lesson Card, the header is empty, so no subcomponent will be needed. Our Course Card has an image, so we know we will need a component for that. I've highlighted it in orange.

![](./coursecard-hierarchy.png)

Our Playlist Card has a lot going on, and will need to host an entire set of subcomponents. Let's take a closer look.

#### Playlist Component
I've drawn a purple square around the area inside the header that the playlist will take up. Examining the inside of the playlist, I can see several line items, each representing a video in the list. I know that we will need subcomponents for each of these, so I'll separate them with a dashed purple line. Now that we can see them sliced horizontally, we have different vertical lines to draw as well, separating the playlist status icon, a language type icon, the video's name, and the video length.

Below the Playlist Entries, we have the `PlayButton` component outlined in dark green, even though we've already created it.

Finally, underneath the `PlayButton` we have a summary of the remaining time in the playlist.

![](./playlistcard-hierarchy.png)

### CardHeader Component Tree
It can be helpful to look at the hierarchy as a tree. We'll revisit this as we build out the subcomponents.

* `CardHeader`
  - `HeaderImage`
  - `Playlist`
    - `PlaylistItem`
      - `PlayedStatus` (conditional classes on the `<li>`)
      - `CategoryIcon`
      - `VideoTitle`
      - `VideoLength`
    - `PlayButton`
    - `PlaylistSummary`

## Card Body (Neon Green)
The body of the card is simple, and contains two subcomponents: a title, and the author.

### CardBody Component Tree
* `CardBody`
  - `CardTitle`
  - `CardAuthor`

## Card Footer (Neon Blue)
The footer is split between an indicator of the type of material the card represents, and statistics or metadata about the material-- such as number of videos and length.

#### MaterialType Component
Outlined in maroon, the `MaterialType` features a pill with different styling applied depending on if the material is a course, lesson, or a playlist.

#### MaterialMeta Component
The metadata for the material has been sliced into subcomponents by yellow lines, and again, presentation depends upon the type of material.

### CardFooter Component Tree
* `CardFooter`
  - `MaterialType`
  - `MaterialMeta`
    - `LessonCount`
    - `CompletedLessonCount`
    - `ProgressBar`
    - `LessonLength`
    - `LessonTypeIcon`

![](./lessoncard-hierarchy.png)

# 04. Starting the Card Component
In the last section, we created a component hierarchy for our cards, and now we will start creating a reusable `Card` component that will eventually replace our `StaticCard` examples.

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

# 05. Creating the CardBody subcomponent

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

Once that's done, we'll remove the hardcoded `'Test Title'` and `'Test Author'` strings and replace them with our new prop variables.

```javascript
export const Card = ({title, author}) => {
  return (
    <div className={commonCardClasses}>
      <div className={commonInnerClasses}>
        <CardBody title={title} author={author} />
      </div>
    </div>
  )
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}
```

Saving the file at this point, our `Card` preview again updates to be invisible. This is because we need to pass `title` and `author` props in when we instantiate our `Card`.

## Updating our Example Card
In our `index.js` file where we are rendering our exmaple cards, I'm going to create an object variable above our call to `ReactDOM.render` that will hold our sample data. For illustrative purposes, I'm going to replicate our example cards exactly, so I'll just copy and paste the title and author strings we've already been using.

```javascript
const testData = {
  title: 'Introduction to RxJS Marble Testing Two lines headline',
  author: 'Joe Maddalone'
}
```

With our test data in place, we can now update our `Card` component to make use of the `title` and `author` props:

```javascript
<Card title={testData.title} author={testData.author} />
```

After we save the file, our card is back to showing us the wide preview of our `Card`, but this time without the values having been hardcoded.

# 06. Card Type Awareness
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
export const CourseCard = ({title, author}) => {
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

Inside of this new `<div>` and below our `<PlayButton />`, we'll add a new `PlaylistSummary` component.

This component is yet another stateless functional component, and will take the `timeRemaining` and `lessonsLeft` from `meta`, and we will again be making use of a ternary statement to determine if we will be pluralizing the word "lesson" or not.

```javascript
const PlaylistSummary = ({timeRemaining, lessonsLeft}) => {
  return (
    <div className='ph4 pt5'>
      <div className='tc f6 lh-title light-gray'>
        {`${timeRemaining} to go (${lessonsLeft} more ${lessonsLeft === 1 ? 'lesson' : 'lessons'})`}
      </div>
    </div>
  )
}
```

With `PlaylistSummary` created, we can add it to the `PlaylistHeader` component:

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
      <PlaylistSummary timeRemaining={timeRemaining} lessonsLeft={lessonsLeft} />
    </div>
  )
}
```

Again, remember to declare propTypes for both of our new components.

Saving the file, you should see our `PlaylistHeader` is starting to look like the mockup.

# 10. Creating the Playlist Component
We'll start by creating a new `Playlist.js` file along with an import for React and `PropTypes`.

## Revisting Our Component Plan
Recall our Thinking in React exercise where we planned our components. Our planned `Playlist` hierarchy looked like this:

* `Playlist`
  - `PlaylistItem`
    - `CategoryIcon`
    - `VideoTitle`
    - `VideoLength`
  - `PlayButton`
  - `PlaylistSummary`

We've already created the `PlaylistSummary` and the `PlayButton`, so let's do the `PlaylistItem`and its subcomponents (each of which being, you guessed it, stateless functional components).

## Creating the `Playlist` Component
The `meta` object we've been passing around contains an array called `playlist` that contains objects with the data we need to create our `PlaylistItem` components.

With this in mind, we know that our new `Playlist` component will take the `playlist` array as a prop, and in turn each `item` object in the array will be passed to our new `PlaylistItem` component.

Like before, we will pull our classNames from the Playlst Card example in `StaticCards.js`. Looking at the example, we can tell that our `Playlist` component will contain the `<div>` and `<ul>`, then inside of the `<ul>`we will create `<li>`s for each of our `PlaylistItem`s.

Since we don't know what or how many `PlaylistItem`s we will need, we will call the `.map()` method on our `playlist` prop. The `map()` method takes an arrow function with two paramaters: the first is the item `i` in the array, and the second paramater `k` is the index of the item. We'll use the index for the `key` prop that React uses to help it determine if an item needs updated.

Our arrow function will return a `PlaylistItem` component, passing `i` as the `item` prop, and `k` as the `key` prop. Remember that since our arrow function doesn't have curly braces, we don't need to use the `return` keyword. 

```javascript
const Playlist = ({playlist}) => {
  return (
    <div className='pr3 pt3 bg-tag-gray self-stretch h-100 br2 overflow-y-scroll'>
      <ul className='list pa0 ma0 overflow-hidden card-progress-list'>
        {playlist.map((i, k) => <PlaylistItem item={i} key={k} />)}
      </ul>
    </div>
  )  
}
```

## Creating the `PlaylistItem` Component

We already know that our `PlaylistItem` has an `item` prop, and will return an `<li>`. There will be different classes applied to each item based on its "played" status. Let's start by setting that up.

Looking at our example mockup in `StaticCards.js`, we can see the same set of classes used for every item, with additional classes added for already played items or the item that will be started. For easy access, we'll destructure the `watched` and `current` keys from the `item`, and then use ternary statements for each inside of a string template to fill out our `<li>`'s `classNames`:

```javascript
const PlaylistItem = ({item}) => {
  const { watched, current } = item
  const liClasses = 'flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item' 
  const watchedClasses = 'viewed'
  const currentClasses = 'next'

  return (
    <li className={`${liClasses} ${watched ? watchedClasses : null} ${current ? currentClasses : null}`}>
    </li>
  )
}
```

The first child inside of our `<li>` is a `CategoryIcon`. This component will take in the image as a prop (that will be passed after being destructured inside of our `PlaylistItem`), and return a simple `<img />` tag with some class names applied:

```javascript
const CategoryIcon = ({icon}) => {
  return <img src={icon} className='ml2 mt1' alt='' />
}
```

The last subcomponents are the `VideoTitle` and `VideoLength` displays, both of which are straight forward:

```javascript
const VideoLength = ({length}) => {
  return <div className='w3 ml3 tr o-60'>{length}</div>
}

const VideoTitle = ({title}) => {
  return (
      <div className='truncate'>
        {title}
      </div>
  )
}
```

And adding our classes, we end up with our finished component:

```javascript
const PlaylistItem = ({item}) => {
  const { watched, current, icon, title, length } = item
  const liClasses = 'flex items-start relative f6 lh-solid pointer pv3 pl4 pr3 gray hover-bg-white card-progress-list-item' 
  const textClasses = 'ml2 flex justify-between flex-grow-1 lh-copy overflow-hidden lesson-title'

  const watchedClasses = 'viewed o-60'
  const watchedTitleClasses = 'o-60'
  const currentClasses = 'next'

  return (
    <li className={`${liClasses} ${watched ? watchedClasses : null} ${current ? currentClasses : null}`}>
      <CategoryIcon icon={icon} />
      <div className={`${textClasses} ${watched ? watchedTitleClasses : null}`}>
        <VideoTitle title={title} />
        <VideoLength length={length} />
      </div>
    </li>
  )
}
```


## Some Housekeeping
Now we've completed all of our Playlist subcomponents, but for the time being we have half of our Playlist-related code in `Cards.js`, and half in `Playlist.js`. Let's do a little cleanup and refactoring.

Start by moving `PlaylistCard`, `PlaylistMeta`, `PlaylistSummary`, and `PlaylistHeader` over into `Playlist.js`.

We'll now need to add the `export` keyword to `PlaylistMeta` and `PlaylistHeader` so we can import them into `Card.js`:

```javascript
import { PlaylistCard, PlaylistMeta, PlaylistHeader } from './Playlist'
```

We also need to move our `PlaylistCard` import in our `index.js` file to be from `./Playlist` instead of `./Card`.

## Finishing Up

With all of our playlist-related code all in the same file, all that's left for now is to add our `Playlist` component into its place on the line below `<PlayButton />` in our `PlaylistHeader` component.

```javascript
export const PlaylistHeader = ({meta}) => {
  const { timeRemaining, lessonsLeft } = meta
  return (
    <div>
      <div className='relative w-100' style={{
        height: '290px'
      }}>
        <PlayButton />
        <Playlist playlist={meta.playlist} />
      </div>
      <PlaylistSummary timeRemaining={timeRemaining} lessonsLeft={lessonsLeft} />
    </div>
  )
}
```

# 11. Splitting Out `CourseCard` and `LessonCard` Components
Splitting the code for our other specific cards will follow a process much the same to what we just did with our `Playlist` file.

## Migrating `CourseCard`
We'll start by creating a new file `Course.js` in our `src` directory. At the top of our file, we'll need to import React, our `PlayButton` component, and `Card`. 

```javascript
import React, { PropTypes } from 'react'
import PlayButton from './PlayButton'
import { Card } from './Card'
```

With our imports in place, we can copy and paste the code for `CourseMeta`, `CourseHeader`, and `CourseCard` from `Card.js` into our new file. We also will add the `export` keyword to all three.

Now that we've exported our components, we need to adjust the places they are imported. 
Inside of `Card.js`, we need to do a destructured import of `CourseMeta` and `CourseHeader`, and inside of `index.js`, we need to import `CourseCard`:

```javascript
// Card.js
import { CourseMeta, CourseHeader } from './Course'

// index.js
import { CourseCard } from './Course'
```

## Migrating `LessonCard`
_These steps are exactly the same as above, but replace the word "Course" with "Lesson". For the sake of lowering cognitive overhead, I'll go ahead and do that below:_

We'll start by creating a new file `Lesson.js` in our `src` directory. At the top of our file, we'll need to import React, our `PlayButton` component, and `Card`. 

```javascript
import React, { PropTypes } from 'react'
import PlayButton from './PlayButton'
import { Card } from './Card'
```

With our imports in place, we can copy and paste the code for `LessonMeta`, `LessonHeader`, and `LessonCard` from `Card.js` into our new file. We also will add the `export` keyword to all three.

Now that we've exported our components, we need to adjust the places they are imported. 
Inside of `Card.js`, we need to do a destructured import of `LessonMeta` and `LessonHeader`, and inside of `index.js`, we need to import `LessonCard`:

```javascript
// Card.js
import { LessonMeta, LessonHeader } from './Lesson'

// index.js
import { LessonCard } from './Lesson'
```

## Wrapping Up
Now that we have added all three of our dynamic card components into our App's `index.js` file, we can delete the `StaticCard` examples and the `div`s that contain them. Upon saving the file, our App will reload, and we are left with cards that look strikingly similar to our source mockups!



