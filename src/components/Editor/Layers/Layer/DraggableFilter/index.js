import flow from 'lodash/flow';
import pick from 'lodash/pick';

import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import css from 'react-css-modules';

import { filterProps } from '../../../../propTypes';
import draggable from '../../../../hoc/draggable';
import ItemTypes from '../../../ItemTypes';
import Filter from '../Filter';

import getTransformStyle from './getTransformStyle';
import dragSource, { dragSourceProps } from './dragSource';
import styles from './styles';

const { string, func } = PropTypes;

export class DraggableFilter extends Component {
  static propTypes = {
    ...filterProps,
    layerId: string.isRequired,
    onDestroy: func.isRequired,
    onToggleVisibility: func.isRequired,
    onToggleLocked: func.isRequired,
    connectDragPreview: func.isRequired
  };

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    /* eslint-disable react/prop-types */
    const {
      timeline,
      onDestroy,
      onToggleVisibility,
      onToggleLocked,
      isDragging,
      connectDragSource
    } = this.props;
    /* eslint-ensable react/prop-types */

    const styleName = isDragging ? 'dragging' : 'normal';
    const style = getTransformStyle(timeline);
    const known = { styleName, style };

    return connectDragSource(
      <div {...known}>
        <Filter { ...{
          ...{ onDestroy, onToggleVisibility, onToggleLocked },
          ...pick(this.props, dragSourceProps)
        } } />
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DragSource(ItemTypes.Filter, dragSource, collect)
)(DraggableFilter);
/* eslint-enable new-cap */
