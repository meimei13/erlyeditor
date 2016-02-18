import invariant from 'invariant';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { Surface } from 'gl-react-dom';
import css from 'react-css-modules';

import { filterShape } from '../../propTypes';
import styles from './styles';

const {
  bool,
  number,
  object,
  node,
  arrayOf
} = PropTypes;

export class FilterChainSurface extends Component {
  static propTypes = {
    children: node.isRequired,

    width: number.isRequired,
    height: number.isRequired,

    eventsThrough: bool,
    visibleContent: bool,
    autoRedraw: bool,

    filters: arrayOf(filterShape),
    renderers: object.isRequired
  };

  static defaultProps = {
    eventsThrough: true,
    visibleContent: true,
    autoRedraw: true
  };

  @autobind
  renderFilter(children, filter) {
    const { type, attributes } = filter;
    const { renderers, width, height } = this.props;

    const Renderer = renderers[type];
    invariant(Renderer, `Renderer of type ${type} is not registered`);

    return React.createElement(Renderer, {
      ...attributes,
      width,
      height
    }, children);
  }

  render() {
    const {
      children,
      width,
      height,
      filters,
      ...other
    } = this.props;

    return (
      <Surface { ...{ ...{ width, height }, ...other } }>
        {filters.reduceRight(this.renderFilter, children)}
      </Surface>
    );
  }
}

export default css(FilterChainSurface, styles);
