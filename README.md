# mu
A model-update library.

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
const mu = require('@bchar/mu')

const app = mu({
  todos
})
```

### State
Returns a value from a component's state.
```javascript
> app.state('todos/list')
[]
```

### Update
Calls an update from a component, with a payload.
```javascript
> app.update('todos/add', 'hello')
{ list: [ 'hello' ], text: '' }

> app.state('todos/list')
[ 'hello' ]
```

### Subscribe
Every time an update occurs, the function given to subscribe will be called.
```javascript
> app.subscribe(console.log)
> app.update('todos/add', 'again')
{ type: 'todos/add', payload: 'again' } { list: [ 'hello' ], text: '' } { list: [ 'hello', 'again' ] }
{ list: [ 'hello', 'again' ], text: '' }
```
