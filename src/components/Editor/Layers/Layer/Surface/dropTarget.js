import snap from '../../../../../lib/snap';

export default {
  // -
  canDrop(props, monitor) {
    const { type, filterTypes } = props;
    const item = monitor.getItem();
    const filterType = filterTypes.find(ft => ft.name === item.type);

    if (filterType) {
      // layer types on which filter can be placed (dropped)
      const layerTypes = filterType.layerTypes;
      // allowed filter types for layer includes current item's type
      return layerTypes.includes(type);
    }

    return false;
  },

  // -
  // returned value will be available to the drag source
  // in its endDrag method as monitor.getDropResult()
  drop(props, monitor, component) {
    const {
      id,
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
    component.moveFilter(item.id, item.layerId, id, offset);
  }
};
