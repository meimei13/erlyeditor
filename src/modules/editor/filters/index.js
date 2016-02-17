import omit from 'lodash/omit';
import { createReducer } from 'redux-act';
import initialState from './initialState';
import {
  destroy,
  move,
  resize,
  toggleLocked,
  toggleVisibility
} from './actions';

export default createReducer({
  [destroy]: (s, { id }) => omit(s, id),

  [toggleLocked]: (state, { id }) => {
    const filter = state[id];
    const locked = !filter.locked;

    return { ...state, [id]: { ...filter, locked } };
  },

  [toggleVisibility]: (state, { id }) => {
    const filter = state[id];
    const visible = !filter.visible;

    return { ...state, [id]: { ...filter, visible } };
  },

  [move]: (state, { id, offset }) => {
    const filter = state[id];
    const timeline = filter.timeline;

    return {
      ...state,
      [id]: {
        ...filter,
        timeline: { ...timeline, offset }
      }
    };
  },

  [resize]: (state, { id, duration }) => {
    const filter = state[id];
    const timeline = filter.timeline;

    return {
      ...state,
      [id]: {
        ...filter,
        timeline: { ...timeline, duration }
      }
    };
  }
}, initialState);
