# 00. The Starting Point

This repository acts as a step-by-step in converting cards built in static HTML/CSS & [Tachyons](http://tachyons.io) into reusable and composable React components.
## Intro
After cloning this directory, run `npm start` from inside of the `reactify-card` directory. Now when you visit `http://localhost:3000`, you will see three different Cards, the source code for which can be found in `./reactify-card/src/StaticCards.js`.

For the most part, these cards have been marked up in standard HTML, but with some minimal changes to make them play nicely within a React project.

To get started, clone the repo and follow along with the [ordered branches](https://github.com/tayiorbeii/reactify-cards/branches)!
* Each card has been put into its own stateless functional component, which are `export`ed out of `StaticCards.js` and `import`ed into `App.js`.
* Image assets are imported and given variable names at the top of the file, and then referenced like so: `<img src={imgCourseCard} />` (In React, curly braces are used when dealing with variables).
* React uses `className` in its markup rather than `class` (Many of the class names in use are provided via [`tachyons-egghead`](https://github.com/eggheadio/tachyons-egghead/), a compilation of customized [Tachyons](http://tachyons.io) styles)

## Next Step
In the next step, we will start DRYing out the Card markup by assigning our repeated `classNames` to variables.
