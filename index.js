const path = ([key, ...keys], obj) => {
  if (!keys.length || !obj[key]) {
    return obj[key];
  }

  return path(keys, obj[key]);
};

const store = modules => {
  const events = [];
  const types = Object.keys(modules);

  const state = types.reduce((acc, type) => {
    return Object.assign(acc, {
      [type]: modules[type].state()
    });
  }, {});

  const update = types.reduce((acc, type) => {
    return Object.assign(acc, {
      [type]: modules[type].update
    });
  }, {});

  const subscribe = f => {
    return events.push(f);
  };

  return {
    subscribe,
    state: type => {
      const keys = type.split('/');

      return path(keys, state);
    },
    update: (type, payload) => {
      const [key, ...keys] = type.split('/');
      const diff = path(keys, update[key])(payload)(state[key]);

      events.forEach(f => {
        return f({ type, payload }, state[key], diff);
      });

      return Object.assign(state[key], diff);
    }
  };
};

module.exports = store;
