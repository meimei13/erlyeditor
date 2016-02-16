import reduceReducers from 'reduce-reducers';
import { createReducer } from 'redux-act';
import { combineTransform } from '../reducers';

import filters from './filters';
import layers from './layers';

import video from '../html5video';
import player from '../player';

import initialState from './initialState';

export selector from './selector';
export const partial = combineTransform({
  video,
  player,
  layers,
  filters
});

export const editor = createReducer({
}, initialState);

export default reduceReducers(editor, partial);
