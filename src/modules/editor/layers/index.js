import omit from 'lodash/omit';
import { createReducer } from 'redux-act';

import {
  create,
  destroy,
  move,
  addFilter,
  removeFilter
} from './actions';

import initialState from './initialState';

export default createReducer({
  [create]: s => s,
  [destroy]: (s, { id }) => omit(s, id),
  [move]: s => s,

  [addFilter]: (state, { id, filterId }) => {
    const layer = state[id];
    const filters = layer.filters;

    return {
      ...state,
      [id]: {
        ...layer,
        filters: [
          ...filters,
          filterId
        ]
      }
    };
  },
  [removeFilter]: (state, { id, filterId }) => {
    const layer = state[id];
    const filters = layer.filters.filter(f => f !== filterId);

    return { ...state, [id]: { ...layer, filters } };
  }
}, initialState);
