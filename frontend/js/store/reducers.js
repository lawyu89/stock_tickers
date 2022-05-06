import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { stocksReducer as stocks } from './stocks';

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    stocks,
  });
};
