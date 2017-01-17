<p align="center">
  <img width="206" alt="arclogo2" src="https://cloud.githubusercontent.com/assets/3068563/19498653/f9b73170-9570-11e6-9183-61dce798abab.png"><br><br>
  <a href="http://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard Style" /></a>
  <a href="https://travis-ci.org/diegohaz/arc"><img src="https://img.shields.io/travis/diegohaz/arc/redux.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://codecov.io/gh/diegohaz/arc/branch/redux"><img src="https://img.shields.io/codecov/c/github/diegohaz/arc/redux.svg?style=flat-square" alt="Coverage Status" /></a>
</p>

## Redux

This branch adds [redux](https://github.com/reactjs/redux), [redux-saga](https://github.com/yelouafi/redux-saga) and [redux-form](https://github.com/erikras/redux-form) to the [master](https://github.com/diegohaz/arc) branch.

See the [demo](https://arc.js.org).

## Download

Just clone the repository and remove the `.git` folder:

```sh
$ git clone -b redux https://github.com/diegohaz/arc my-app
$ cd my-app
$ rm -rf .git
$ npm install # or yarn
```

## Usage

- [Run](#run)
- [Deploy](#deploy)
- [Source code](#source-code)
- [Clean source code](#clean-source-code)
- [Components](#components)
  - [Storybook](#storybook)
- [Containers](#containers)
- [Store](#store)
  - [Store naming conventions](#store-naming-conventions)

### Run

Once you have installed the dependencies, you can use `npm start` to run a development server.

### Deploy

Use `npm run build` to transpile the code into the `dist` folder. Then, you can deploy it everywhere.

### Source code

The source code should be placed in `src`; public/static files should be placed in `public` so they can be included in the build process.

Because of [webpack's config](https://github.com/diegohaz/arc/blob/5c752968c52d013f7218b514021eae08f6ddf07c/webpack.config.js#L19-L21), we can import our source modules without relative paths.
```js
import { Button, HomePage } from 'components' // src/components
import App from 'components/App' // src/components/App
import routes from 'routes' // src/routes
```

### Clean source code

If you want to start with a clean and minimal source code without the predefined components and tests, just use the `src-clean` folder instead by renaming it to `src` (and removing or renaming the older one to something like `src-example`).

Also, you might want to remove unnecessary dependencies:
```sh
npm u -S react-modal # used by src/components/molecules/Modal
npm u -S normalizr # used by src/store/entities
```

### Components

This project leverages the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) methodology to create a scalable and easy to maintain component folder structure. See [why](https://github.com/diegohaz/arc#why).

However, Atomic Design should be a solution, **not another problem**. If you want to create a component and don't know where to put it (`atoms`, `molecules`, `organisms` etc.), **do not worry, do not think too much, just put it anywhere**. After you realize what it is, just move the component folder to the right place. Everything else should work.

<p align="center"><img src="https://cloud.githubusercontent.com/assets/3068563/21237760/6b941f76-c2e7-11e6-92e3-bbb7c82b3622.gif"></p>

This is possible because all components are dynamically exported on [`src/components/index.js`](src/components/index.js) and imported in a way that Atomic Design structure doesn't matter:

```js
import { Button, Hero, HomePage, PageTemplate } from 'components'
```

To understand better the Atomic Design methodology, you can refer to the [`src/components`](src/components) folder here and the [Pattern Lab Demo](http://demo.patternlab.io/), which this project is based on. Basically, you can think this way:

- An **atom** is a native html tag or a React Component that renders an html tag (e.g [`Input`](src/components/atoms/Input/index.js));
- A **molecule** is a group of atoms (e.g. [`Field`](src/components/molecules/Field/index.js));
- An **organism** is a group of atoms, molecules and/or other organisms (e.g. [`Form`](https://github.com/diegohaz/arc/blob/redux/src/components/organisms/PostForm/index.js));
- A **page** is... a page, where you will put mostly organisms (e.g. [`HomePage`](src/components/pages/HomePage/index.js));
- A **template** is a layout to be used on pages, see [why templates are good practice](https://github.com/diegohaz/arc/issues/20#issuecomment-265934388).

#### Storybook

I highly recommend you to incorporate [react-storybook](https://github.com/storybooks/react-storybook) on your development process. It really improves productivity and developer experience. Actually, most of the time you can just use the storybook instead of the real webapp while creating components.

This already comes with the boilerplate and you can simply use `npm run storybook` to get it running. But, if you don't want that, just run:
```sh
rm -rf .storybook # remove .storybook folder
npm u -S @kadira/storybook # remove storybook dependency
```

### Containers

This project uses a very straight approach of Redux: all components should be as [pure](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.ly1b33jnz) as possible and should be placed in the `components` folder.

If, for some reason, you need to connect a component to the store, just create a container with the same name, import the pure component and connect it. Thus having a nice separation of concerns. **Do not add any extra styles or another presentational logic on containers**.

You can refer to [this thread](https://twitter.com/dan_abramov/status/668585589609005056) on Twitter:
<p align="center"><img alt="Dan Abramov Tweet" src="https://cloud.githubusercontent.com/assets/3068563/19958100/77ca1b68-a183-11e6-887e-a491dc783f43.png"></p>

Example:

**src/components/organisms/PostList**
```js
// just presentational logic
import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Post } from 'components'

const PostList = ({ list, loading, ...props }) => {
  return (
    <div {...props}>
      {loading && <div>Loading</div>}
      {list.map((post, i) => <Post key={i} {...post} />)}
    </div>
  )
}

PostList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool
}

export default PostList
```

**src/containers/PostList**
```js
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromPost, fromStatus } from 'store/selectors'
import { postList, POST_LIST } from 'store/actions'

import { PostList } from 'components'

class PostListContainer extends Component {
  componentDidMount () {
    this.props.request()
  }

  render () {
    const { list, loading } = this.props
    return <PostList {...{ list, loading }} />
  }
}

const mapStateToProps = (state) => ({
  list: fromPost.getList(state),
  loading: fromStatus.isLoading(state, POST_LIST)
})

const mapDispatchToProps = (dispatch, { limit }) => ({
  request: () => dispatch(postList.request(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
```

**src/components/elsewhere**
```js
import { PostList } from 'containers'

<PostList limit={15} />
```

This approach makes it easier to transform any pure component into a container at any time.

### Store

Here lives all the state management of the app.

- `actions` are the messages dispatched throughout the application to perform state changes. [Learn more](http://redux.js.org/docs/basics/Actions.html);
- `reducer` listens to the actions and translates the state changes to the store. [Learn more](http://redux.js.org/docs/basics/Reducers.html);
- `selectors` are used by the application to get parts of the current state. [Learn more](http://redux.js.org/docs/recipes/ComputingDerivedData.html);
- `sagas` listen to the actions and are responsible for performing side effects, like data fetching, caching etc. [Learn more](https://github.com/yelouafi/redux-saga).

To add a new store, just create a new folder with actions, reducer, selectors and/or sagas. Webpack will automatically import them to your project (how? See [`src/store/actions.js`](src/store/actions.js), [`src/store/reducer.js`](src/store/reducer.js), [`src/store/sagas.js`](src/store/sagas.js) and [`src/store/selectors.js`](src/store/selectors.js)).

#### Store naming conventions

The store on this boilerplate follows some naming conventions. You don't need to follow them, but it will work better if you do.

- `actions` should start with the store name (e.g. `MODAL_OPEN` for `modal` store, `POST_LIST_REQUEST` for `post` store) and end with `REQUEST`, `SUCCESS` or `FAILURE` if this is an async operation;
- `action creators` should have the same name of their respective actions, but in camelCase (e.g. `modalOpen`). Async actions should group `request`, `success` and `failure` in a object (e.g. `postList.request`, `postList.success`, `postList.failure`);
- `worker sagas` should start with the operation name (e.g. `openModal`, `requestPostList`).
