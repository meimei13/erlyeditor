import { createAction as action } from 'redux-act';

export const destroy = action('filter.destroy', id => ({ id }));
export const toggleDisabled = action('filter.toggleDisabled', id => ({ id }));
export const update = action('filter.update', (id, timeline) => ({ id, ...timeline }));
