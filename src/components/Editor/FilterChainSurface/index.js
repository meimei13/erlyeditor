import React, { Component, PropTypes } from 'react';
import { Surface } from 'gl-react-dom';
import css from 'react-css-modules';

import {
  Hue,
  Blur,
  Overlay
}from './renderers';

import styles from './styles';

const { bool, number, node } = PropTypes;

export class FilterChainSurface extends Component {
  static propTypes = {
    children: node.isRequired,

    width: number.isRequired,
    height: number.isRequired,

    eventsThrough: bool,
    visibleContent: bool,
    autoRedraw: bool
  };

  static defaultProps = {
    eventsThrough: true,
    visibleContent: true,
    autoRedraw: true
  };

  state = {
    blur: 2,
    blurPasses: 2,
    hue: 140
  };

  render() {
    const {
      children,
      width,
      height,
      ...other
    } = this.props;

    const { blurPasses, blur, hue } = this.state;

    const known = { width, height };

    return (
      <Surface { ...{ ...known, ...other } }>
        <Blur width={width} height={height} passes={blurPasses} factor={blur}>
          <Hue hue={hue}>
            {children}
          </Hue>
        </Blur>
      </Surface>
    );

    // return (
    //   <Surface { ...{ ...known, ...other } }>
    //     {children}
    //   </Surface>
    // );
  }
}

export default css(FilterChainSurface, styles);
