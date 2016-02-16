import { PropTypes } from 'react';

const { number, string, shape } = PropTypes;

export default shape({
  code: number,
  title: string,
  body: string
});
