import omit from 'lodash/omit';
import { createReducer } from 'redux-act';
import initialState from './initialState';
import {
  destroy,
  toggleDisabled,
  update
} from './actions';

export default createReducer({
  [destroy]: (s, { id }) => omit(s, id),

  [toggleDisabled]: (state, { id }) => {
    const filter = state[id];
    const disabled = !filter.disabled;

    return { ...state, [id]: { ...filter, disabled } };
  },

  [update]: (state, { id, offset, duration }) => {
    const filter = state[id];
    const timeline = filter.timeline;

    return {
      ...state,
      [id]: {
        ...filter,
        timeline: {
          offset: offset || timeline.offset,
          duration: duration || timeline.duration
        }
      }
    };
  }
}, initialState);
