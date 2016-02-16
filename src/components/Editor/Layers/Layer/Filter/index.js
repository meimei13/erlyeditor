import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import { filterProps } from '../../../../propTypes';

import Controls from './Controls';
import styles from './styles';

const { string, func } = PropTypes;

/* eslint-disable react/prop-types */
export class Filter extends Component {
  static propTypes = {
    ...filterProps,
    className: string,
    onDestroy: func.isRequired,
    onToggleDisabled: func.isRequired
  };

  @autobind
  handleDestroy() {
    if (this.props.onDestroy) {
      this.props.onDestroy(this.props.id);
    }
  }

  @autobind
  handleToggleDisabled() {
    if (this.props.onToggleDisabled) {
      this.props.onToggleDisabled(this.props.id);
    }
  }

  render() {
    const {
      id,
      layerId,
      timeline,
      disabled,
      appearance
    } = this.props;

    const { duration } = timeline;

    const state = disabled ? 'disabled' : 'enabled';
    const styleName = cn('filter', state);
    const style = {
      width: duration,
      backgroundColor: appearance.color
    };

    const known = { styleName, style };

    return (
      <div {...known}>
        <h6 styleName='title'>
          {`${id}-${layerId}`}
        </h6>
        <Controls
          disabled={disabled}
          onDestroy={this.handleDestroy}
          onToggleDisabled={this.handleToggleDisabled}
        />
      </div>
    );
  }
}
/* eslint-ensable react/prop-types */

export default css(Filter, styles, { allowMultiple: true });
