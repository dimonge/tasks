import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers/';

const logger = createLogger();

export default function configureStore() {
  return createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware,
      logger
    )
  )
}