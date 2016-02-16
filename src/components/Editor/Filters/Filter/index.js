import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import tooltip from '../../../hoc/tooltip';
import styles from './styles';

const { bool, string, object } = PropTypes;
const TooltipBlock = tooltip(React.DOM.div);

export class Filter extends Component {
  static propTypes = {
    className: string,
    disabled: bool,
    name: string.isRequired,
    description: string.isRequired,
    appearance: object.isRequired,
    circle: bool
  };

  static defaultProps = {
    disabled: false,
    circle: false
  };

  render() {
    const {
      className,
      disabled,
      name,
      description,
      appearance,
      circle
    } = this.props;

    const styleName = cn('filter', circle ? 'circle' : 'squared');
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

export default css(Filter, styles, { allowMultiple: true });
