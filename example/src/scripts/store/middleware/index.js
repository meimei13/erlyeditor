import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { applyMiddleware } from 'redux';

function getEnvMiddleware() {
  return require('./development');
}

export function setup(router) {
  const env = getEnvMiddleware();

  return applyMiddleware(
    router,
    thunk,
    promise,
    ...env
  );
}
