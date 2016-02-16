import snap from '../../../../../lib/snap';

export default {
  // canDrop(props, _monitor) {
  // },

  drop(props, monitor, component) {
    const {
      snapToGrid,
      cellSize
    } = props;

    // the item being dropped
    const item = monitor.getItem();
    const { timeline } = item;

    // difference between the last recorded client offset of the pointer
    // and the client offset when current the drag operation has started
    const delta = monitor.getDifferenceFromInitialOffset();

    const x = Math.floor(timeline.offset + delta.x);
    const offset = snapToGrid ? snap(x, cellSize) : x;

    // update filter position on a timeline
    component.moveFilter(item.id, offset);
  }
};
