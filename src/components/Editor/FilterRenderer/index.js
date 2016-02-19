import partition from 'lodash/partition';
import invariant from 'invariant';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { Surface } from 'gl-react-dom';
import css from 'react-css-modules';

import { filterShape } from '../../propTypes';

import styles from './styles';

const Overlay = __CLIENT__ ? require('./renderers/Overlay') : void 0;
// ^-- TODO: find a better way to do SSR

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
    renderers: object
  };

  static defaultProps = {
    eventsThrough: true,
    visibleContent: true,
    autoRedraw: true
  };

  getRenderer(type) {
    const { renderers } = this.props;

    const Renderer = renderers[type];
    invariant(Renderer, `Renderer of type ${type} is not registered`);

    return Renderer;
  }

  @autobind
  renderFilter(children, filter) {
    const { type, attributes } = filter;
    const { width, height } = this.props;

    const Renderer = this.getRenderer(type);

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

    const [overlayFilters, effectFilters] = partition(
      filters, ({ type }) => type === 'overlay');

    // TODO: ok, I need to think of how to combine this
    // I'll just leave it as is for now, without overlay processing
    // Will comeback here later when the author of gl-react will respond
 
    return (
      <Surface { ...{ ...{ width, height }, ...other } }>
        {effectFilters.reduceRight(this.renderFilter, children)}
      </Surface>
    );
  }
}

export default css(FilterChainSurface, styles);
