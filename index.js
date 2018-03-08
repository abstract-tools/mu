const path = ([key, ...keys], obj) => {
  if (!keys.length || !obj[key]) {
    return obj[key];
  }

  return path(keys, obj[key]);
};

const mu = modules => {
  let event = () => {};

  const state = Object.keys(modules).reduce((acc, key) => {
    return Object.assign({}, acc, {
      [key]: modules[key].state()
    });
  }, {});

  const update = Object.keys(modules).reduce((acc, key) => {
    return Object.assign({}, acc, {
      [key]: modules[key].update
    });
  }, {});

  const subscribe = f => {
    event = f;
  };

  return {
    subscribe,
    state: type => {
      const keys = type.split('/');

      return path(keys, state);
    },
    update: (type, payload) => {
      const [key, ...rest] = type.split('/');
      const diff = path(rest, update[key])(payload)(state[key]);

      event({ type, payload }, state[key], diff);

      return Object.assign(state[key], diff);
    }
  };
};

module.exports = mu;
