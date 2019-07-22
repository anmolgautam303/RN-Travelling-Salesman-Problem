import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import Saga from '../saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(
    reducer,
    applyMiddleware(ReduxThunk, sagaMiddleware, logger)
);

// then run the saga
sagaMiddleware.run(Saga);
