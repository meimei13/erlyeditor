import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import styles from './styles';

const { bool, string, object } = PropTypes;

export class Filter extends Component {
  static propTypes = {
    className: string,
    name: string.isRequired,
    description: string.isRequired,
    appearance: object.isRequired,
    circle: bool,
    disabled: bool,
    isDragging: bool
  };

  static defaultProps = {
    disabled: false,
    circle: false
  };

  render() {
    const {
      className,
      name,
      appearance,
      circle,
      isDragging
    } = this.props;

    const shape = circle ? 'circle' : 'squared';
    const state = isDragging ? 'dragging' : 'normal';
    const styleName = cn('filter', shape, state);
    const style = {
      backgroundColor: appearance.color
    };

    return (
      <div { ...{ styleName, className, style } }>
        <h6 styleName='title'>{name}</h6>
      </div>
    );
  }
}

export { styles };
export default css(Filter, styles, { allowMultiple: true });
