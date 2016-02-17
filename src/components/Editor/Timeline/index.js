import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import { percentageShape } from '../../propTypes';
import Slider from '../../Slider';
import styles from './styles';

const { bool, number, string, func } = PropTypes;

export class Timeline extends Component {
  static propTypes = {
    className: string,
    step: number,
    disabled: bool,
    currentTime: number.isRequired,
    duration: number.isRequired,
    percentage: percentageShape.isRequired,
    onSeek: func.isRequired
  };

  @autobind
  handleSeek(offset) {
    this.props.onSeek(Number(offset));
  }

  render() {
    const {
      className,
      step,
      disabled,
      duration,
      currentTime,
      percentage,
      onSeek
    } = this.props;

    const { buffered, played } = percentage;

    const styleName = cn('timeline', disabled ? 'disabled' : 'enabled');
    const lineStyle = {
      right: `${100 - played}%`
    };

    return (
      <div {...{ styleName, className } }>
        <div styleName='line' style={lineStyle}></div>
      </div>
    );
  }
}

export default css(Timeline, styles, { allowMultiple: true });
