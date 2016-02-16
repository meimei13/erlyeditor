import { PropTypes } from 'react';

const { func, shape } = PropTypes;

export default shape({
  create: func.isRequired,
  destroy: func.isRequired,

  move: func.isRequired,
  resize: func.isRequired
});
