import omit from 'lodash/omit';
import { createReducer } from 'redux-act';

import {
  create,
  destroy,
  move,
  addFilter,
  removeFilter
} from './actions';

import initialState, { layerDefaults } from './initialState';

let layerId = 10;

export default createReducer({
  [create]: (state, { type }) => {
    const nextId = ++layerId;
    const newLayerId = `${type}${nextId}`;

    const newLayer = {
      id: newLayerId,
      type,
      order: nextId,
      ...layerDefaults
    };

    return {
      ...state,
      [newLayerId]: newLayer
    };
  },

  [destroy]: (s, { id }) => omit(s, id),

  // TODO: Impl move reducer
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
