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



## Next Step
In the next step, we'll extract the "play" button that appears in our three cards.

