import React, { Component, PropTypes } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

const { func, node } = PropTypes;

export default ComposedComponent => class extends Component {
  static propTypes = {
    children: node,
    connectDragSource: func.isRequired,
    connectDragPreview: func.isRequired
  };

  componentDidMount() {
    const { connectDragPreview } = this.props;

    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <ComposedComponent {...this.props} />
    );
  }
};
