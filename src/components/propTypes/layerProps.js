import { PropTypes } from 'react';

import filterShape from './filterShape';

const { bool, number, string, arrayOf } = PropTypes;

export default {
  id: string.isRequired,
  name: string.isRequired,
  description: string.isRequired,
  type: string.isRequired,
  filters: arrayOf(filterShape),
  order: number,
  editable: bool,
  disabled: bool,
  locked: bool,
  single: bool
};
