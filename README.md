# 10. Creating the Playlist Component
We'll start by creating a new `Playlist.js` file along with an import for React and `PropTypes`.

## Revisting Our Component Plan
Recall our Thinking in React exercise where we planned our components. Our planned `Playlist` hierarchy looked like this:

* `Playlist`
  - `PlaylistItem`
    - `PlayedStatus`
    - `CategoryIcon`
    - `VideoTitle`
    - `VideoLength`
  - `PlayButton`
  - `PlaylistSummary`

We've already created the `PlaylistSummary` and the `PlayButton`, so let's do the `PlaylistItem`and its subcomponents (each of which being, you guessed it, stateless functional components).

## Creating `Playlist` and `PlaylistItem`
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


