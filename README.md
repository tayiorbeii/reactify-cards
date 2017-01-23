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

