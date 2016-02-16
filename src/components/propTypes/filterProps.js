import { PropTypes } from 'react';

import filterTimelineShape from './filterTimelineShape';

const { bool, string, object } = PropTypes;

export default {
  id: string.isRequired,
  layerId: string.isRequired,
  type: string.isRequired,
  attributes: object,
  timeline: filterTimelineShape.isRequired,
  disabled: bool,
  appearance: object.isRequired
};
