import { PropTypes } from 'react';
import GL from 'gl-react';
import shaders from './shaders';

const { number, node } = PropTypes;

export default GL.createComponent(
  ({ width, height, hue, children: t }) =>
  <GL.Node
    shader={shaders.hue}
    width={width}
    height={height}
    uniforms={{ t, hue }}
  />,
  {
    displayName: 'Hue',
    propTypes: {
      children: node.isRequired,
      hue: number.isRequired,
      width: number.isRequired,
      height: number.isRequired
    }
  }
);
