import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import { filterTimelineShape } from '../../../../propTypes';

import styles from './styles';

const { object, string } = PropTypes;

export class FilterDragPreview extends Component {
  static propTypes = {
    id: string.isRequired,
    layerId: string.isRequired,
    type: string.isRequired,
    timeline: filterTimelineShape.isRequired,
    appearance: object.isRequired
  };

  state = { tick: false };

  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  @autobind
  tick() {
    this.setState({
      tick: !this.state.tick
    });
  }

  render() {
    const {
      id,
      layerId,
      timeline: {
        duration
      },
      appearance
    } = this.props;

    const { tick } = this.state;
    const style = {
      width: duration,
      backgroundColor: appearance.color
    };

    return (
      <div styleName={tick ? 'tick' : 'tock' } style={style}>
        <h6 styleName='title'>
          {`${id}-${layerId}`}
        </h6>
      </div>
    );
  }
}

export default css(FilterDragPreview, styles);
