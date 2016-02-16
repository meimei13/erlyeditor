import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import css from 'react-css-modules';
import cn from 'classnames';

import {
  filterShape,
  filterTypeShape
} from '../../../../propTypes';
import List from '../../../../List';
import ItemTypes from '../../../ItemTypes';

import DraggableFilter from '../DraggableFilter';
import dropTarget from './dropTarget';
import styles from './styles';

const {
  bool,
  number,
  string,
  arrayOf,
  func
} = PropTypes;

export class Surface extends Component {
  static propTypes = {
    className: string,

    id: string.isRequired,
    type: string.isRequired,

    snapToGrid: bool,
    cellSize: number,

    filterTypes: arrayOf(filterTypeShape),
    filters: arrayOf(filterShape),

    isOver: bool,
    canDrop: bool,
    connectDropTarget: func.isRequired,

    onMoveFilter: func.isRequired,
    onToggleFilterVisibility: func.isRequired,
    onToggleFilterLocked: func.isRequired,
    onDestroyFilter: func.isRequired
  };

  moveFilter(id, sourceLayerId, targetLayerId, offset) {
    this.props.onMoveFilter(id, sourceLayerId, targetLayerId, offset);
  }

  render() {
    const {
      className,

      id,
      filters,

      onToggleFilterVisibility,
      onToggleFilterLocked,
      onDestroyFilter,

      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    const styleName = cn('layer-surface', {
      over: isOver,
      droppable: canDrop
    });

    return connectDropTarget(
      <div { ...{ styleName, className } }>
        <List className={styles.list}>
          {filters.map(filter =>
            <List.Item key={filter.id} selectable>
              <DraggableFilter {...filter}
                layerId={id}
                onToggleVisibility={onToggleFilterVisibility}
                onToggleLocked={onToggleFilterLocked}
                onDestroy={onDestroyFilter}
              />
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

/* eslint-disable new-cap */
export default flow(
  css(styles, { allowMultiple: true }),
  DropTarget(ItemTypes.Filter, dropTarget, collect)
)(Surface);
/* eslint-enable new-cap */
