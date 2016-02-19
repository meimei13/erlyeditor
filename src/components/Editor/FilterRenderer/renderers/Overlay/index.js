import React, { PropTypes } from 'react';
import {
  Surface,
  Gradient
} from 'react-canvas';

const { number } = PropTypes;

const colorStops = [
  { color: 'transparent', position: 0 },
  { color: '#000', position: 1 }
];

const Overlay = props => {
  const {
    width, height,
    x1, y1, x2, y2
  } = props;

  const gradientStyle = {
    left: x1,
    top: y1,
    width: x2,
    height: y2
  };

  return (
    <Surface left={0} top={0} width={width} height={height}>
      <Gradient style={gradientStyle}
        colorStops={colorStops} />
    </Surface>
  );
};

Overlay.propTypes = {
  x1: number.isRequired,
  y1: number.isRequired,
  x2: number.isRequired,
  y2: number.isRequired,
  width: number.isRequired,
  height: number.isRequired
};

export default Overlay;
