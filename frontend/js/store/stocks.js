import api from './api';

// Action types
const types = {
  FETCH_REQUESTED: 'ticker_data/FETCH_REQUESTED',
  FETCH_SUCCESS: 'ticker_data/FETCH_SUCCESS',
  FETCH_ERROR: 'ticker_data/FETCH_ERROR',
};

// Action creators
export const stockActions = {
  fetchTickerData: (ticker) => {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_REQUESTED });
      try {
        const res = await api.get(`http://127.0.0.1:3000/api/tickers/${ticker}`);
        dispatch({ type: types.FETCH_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.FETCH_ERROR, error });
      }
    };
  },
};

// Reducer
export const stocksReducer = (state = {}, action) => {
  if (action.type === types.FETCH_SUCCESS) return { result: action.data };
  return state;
};
