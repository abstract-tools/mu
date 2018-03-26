# stora

A stand-alone model-update library.

[![Build Status](https://travis-ci.org/abstract-tools/stora.svg?branch=master)](https://travis-ci.org/abstract-tools/stora)
[![npm version](https://badge.fury.io/js/stora.svg)](https://badge.fury.io/js/stora)
[![dependencies](https://david-dm.org/abstract-tools/stora.svg)](https://david-dm.org/abstract-tools/stora)

`npm install stora`

## Component

A component is a piece of state that represents a model.

```javascript
const todos = {
  state,
  update
}
```

### State

A function that returns a value.

```javascript
const state = () => ({
  list: [],
  text: ''
})
```

### Update

An object that contains functions to apply over your state.

```javascript
const update = {
  add: item => state => ({ list: state.list.concat(item) }),
  input: text => state => ({ text: state.text.concat(text) }),
  reset: text => state => ({ text: text })
}
```

## Store

A store contains components.

```javascript
const store = require('stora')

const app = store({
  todos
})
```

### State

Returns a value from a component's state.

```javascript
app.state('todos/list')
//=> []
```

### Update

Calls an update from a component, with a payload.

```javascript
app.update('todos/add', 'hello')
//=> { list: [ 'hello' ], text: '' }

app.state('todos/list')
//=> [ 'hello' ]
```

### Subscribe

Every time an update occurs, the function passed to subscribe will be called.

```javascript
app.subscribe(console.log)
app.update('todos/add', 'again')
//=> { type: 'todos/add', payload: 'again' } { list: [ 'hello' ], text: '' } { list: [ 'hello', 'again' ] }
```
