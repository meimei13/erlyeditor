import React, { PropTypes } from 'react';
import GL from 'gl-react';
import shaders from './shaders';

const { number, array, any } = PropTypes;

export default GL.createComponent(
  ({ width, height, direction, children: t, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.blur1D}
      width={width}
      height={height}
      uniforms={{
        direction,
        resolution: [width, height],
        t
      }}
    />,
  {
    displayName: 'Blur1D',
    propTypes: {
      width: number,
      height: number,
      direction: array.isRequired,
      children: any.isRequired
    }
  }
);
