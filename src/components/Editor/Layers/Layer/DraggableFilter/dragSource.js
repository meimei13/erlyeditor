import pick from 'lodash/pick';

export const dragSourceProps = [
  'id',
  'layerId',
  'type',
  'timeline',
  'disabled',
  'appearance'
];

export default {
  canDrag(props, _monitor) {
    return !props.disabled;
  },

  beginDrag(props) {
    return pick(props, dragSourceProps);
  }
};
