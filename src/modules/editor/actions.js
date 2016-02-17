import { createAction as action } from 'redux-act';

export const createFilter = action(
  'editor.createFilter',
  (layerId, type) => ({ layerId, type })
);
