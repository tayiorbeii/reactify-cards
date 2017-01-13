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

