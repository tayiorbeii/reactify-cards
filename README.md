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

## All Together Now
Now we've completed all of our Playlist subcomponents, but for the time being we have half of our Playlist-related code in `Cards.js`, and half in `Playlist.js`. Let's do a little cleanup and refactoring.


