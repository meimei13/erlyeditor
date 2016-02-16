import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import css from 'react-css-modules';
import cn from 'classnames';

import { filterShape } from '../../../../propTypes';
import List from '../../../../List';
import ItemTypes from '../../../ItemTypes';

import DraggableFilter from '../DraggableFilter';
import dropTarget from './dropTarget';
import styles from './styles';

const { bool, number, string, arrayOf, func } = PropTypes;

export class Surface extends Component {
  static propTypes = {
    className: string,
    snapToGrid: bool,
    cellSize: number,
    filters: arrayOf(filterShape),
    isOver: bool,
    canDrop: bool,
    connectDropTarget: func.isRequired,
    onMove: func.isRequired,
    onDestroy: func.isRequired,
    onToggleDisabled: func.isRequired
  };

  moveFilter(id, offset) {
    if (this.props.onMove) {
      this.props.onMove(id, offset);
    }
  }

  render() {
    const {
      className,
      filters,
      onDestroy,
      onToggleDisabled,
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    const filterHandlers = {
      onToggleDisabled,
      onDestroy
    };

    const styleName = cn('layer-surface', {
      over: isOver,
      droppable: canDrop
    });

    return connectDropTarget(
      <div { ...{ styleName, className } }>
        <List className={styles.list}>
          {filters.map(filter =>
            <List.Item key={filter.id} selectable>
              <DraggableFilter { ...{ ...filterHandlers, ...filter } } />
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
