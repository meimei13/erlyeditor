import omit from 'lodash/omit';
import { createReducer } from 'redux-act';

import {
  destroy,
  move,
  addFilter,
  removeFilter
} from './actions';

import initialState from './initialState';

export default createReducer({
  [destroy]: (s, { id }) => omit(s, id),

  [removeFilter]: (state, { id, filterId }) => {
    const layer = state[id];
    const filters = layer.filters.filter(filter => filter !== filterId);

    return { ...state, [id]: { ...layer, filters } };
  }
}, initialState);
