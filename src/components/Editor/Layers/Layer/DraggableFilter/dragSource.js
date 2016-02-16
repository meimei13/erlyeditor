import pick from 'lodash/pick';

export const dragSourceProps = [
  'id',
  'type',
  'layerId',
  'timeline',
  'visible',
  'locked',
  'attributes',
  'appearance'
];

export default {
  canDrag({ locked }, _monitor) {
    return !locked;
  },

  // *
  // return the information that should be available
  // to the drop targets about the drag source
  beginDrag(props) {
    return pick(props, dragSourceProps);
  }
};
