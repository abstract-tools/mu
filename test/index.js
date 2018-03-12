const test = require('tape');
const store = require('../index');

const state = () => ({
  list: [],
  text: ''
});

const update = {
  add: item => state => ({ list: state.list.concat(item) }),
  input: text => state => ({ text: state.text.concat(text) })
};

const todos = {
  state,
  update
};

test('mu update', t => {
  const app = store({ todos });

  app.update('todos/add', 'test');

  t.same(app.state('todos/list'), ['test']);

  t.end();
});

test('mu subscribe', t => {
  const app = store({ todos });

  t.plan(4);

  app.subscribe(({ type, payload }, oldState, newState) => {
    t.same(type, 'todos/input');
    t.same(payload, 'test');
    t.same(oldState, { list: [], text: '' });
    t.same(newState, { text: 'test' });
  });

  app.update('todos/input', 'test');
});
