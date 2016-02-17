import GL from 'gl-react';
import shaders from './shaders';

export default GL.createComponent(
  ({ width, height, hue, children }) =>
  <GL.Node
    shader={shaders.hue}
    width={width}
    height={height}
    uniforms={{ hue }}>
    <GL.Uniform name='tex'>{children}</GL.Uniform>
  </GL.Node>,
  { displayName: 'Hue' }
);
