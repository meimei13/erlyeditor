import clamp from 'lodash/clamp';
import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import css from 'react-css-modules';
import { HotKeys } from 'react-hotkeys';

import {
  videoProps,
  playbackRateShape,
  playerActionsShape
} from '../propTypes';

import hoverable from '../hoc/hoverable';
import HUD from './HUD';
import Info from './Info';
import SeekBar from './SeekBar';
import Overlay from './Overlay';
import Controls from './Controls';

import styles from './styles';

const { bool, number, string, node, shape } = PropTypes;

const vimKeyMap = {
  rewind10: 'h',
  forward10: 'l',
  rewind30: 'ctrl+h',
  forward30: 'ctrl+l',
  decreasePlaybackRate: 'shift+h',
  increasePlaybackRate: 'shift+l',
  togglePlay: 'p'
};

export class Player extends Component {
  static propTypes = {
    className: string,
    children: node.isRequired,

    debug: bool,
    hovered: bool,
    width: number,
    height: number,
    playbackRate: playbackRateShape,

    actions: playerActionsShape.isRequired,
    video: shape(videoProps).isRequired
  };

  static defaultProps = {
    debug: Boolean(__DEVELOPMENT__),
    width: 640,
    playbackRate: {
      step: 0.25,
      min: 0.25,
      max: 4
    }
  };

  handleToggleMute = () => this.sendCommand('toggleMute');
  handleToggleLoop = () => this.sendCommand('toggleLoop');
  handleTogglePlay = () => this.sendCommand('togglePlay');
  handleToggleFullScreen = () => this.sendCommand('toggleFullScreen');
  handleVolumeChange = volume => this.sendCommand('setVolume', volume);
  handleSeek = offset => this.sendCommand('seek', offset);

  handleDecreasePlaybackRate = () => this.setPlaybackRate(-1);
  handleIncreasePlaybackRate = () => this.setPlaybackRate(+1);

  setPlaybackRate = factor => {
    const { video, playbackRate: { min, max, step } } = this.props;
    const value = clamp(video.playbackRate + step * factor, min, max);
    this.sendCommand('setPlaybackRate', value);
  };

  sendCommand = (command, ...args) =>
    Object.values(this.refs).forEach(r => r[command](...args));

  renderVideos() {
    return React.Children.map(this.props.children, (video, index) =>
      React.cloneElement(video, { ref: `video-${index}` }));
  }

  renderContainer() {
    if (!React.Children.count) return null;

    const { debug, video, hovered } = this.props;

    return (
      <div styleName='container'>
        {this.renderVideos()}
        <Overlay {...video} debug={debug} onTogglePlay={this.handleTogglePlay}>
          <HUD {...video} hovered={hovered} />
        </Overlay>
      </div>
    );
  }

  render() {
    const { className, width, height, actions, video, hovered } = this.props;

    const keyboardHandlers = {
      togglePlay: this.handleTogglePlay,
      decreasePlaybackRate: this.handleDecreasePlaybackRate,
      increasePlaybackRate: this.handleIncreasePlaybackRate
    };

    return (
      <HotKeys tabIndex={0}
        keyMap={vimKeyMap}
        handlers={keyboardHandlers}
        className={className}
        styleName='player'
        style={{ width, height }}
      >
        {this.renderContainer()}
        <SeekBar {...video}
          disabled={Boolean(video.error)}
          step={1}
          onSeek={this.handleSeek}
        />
        <Info />
        <Controls {...video}
          error={Boolean(video.error)}
          visible={hovered}
          onToggleDebugMonitor={actions.toggleDebugMonitor}
          onVolumeChange={this.handleVolumeChange}
          onTogglePlay={this.handleTogglePlay}
          onToggleMute={this.handleToggleMute}
          onToggleLoop={this.handleToggleLoop}
          onToggleFullScreen={this.handleToggleFullScreen}
          onDecreasePlaybackRate={this.handleDecreasePlaybackRate}
          onIncreasePlaybackRate={this.handleIncreasePlaybackRate}
        />
      </HotKeys>
    );
  }
}

export default compose(
  hoverable,
  css(styles, { allowMultiple: true })
)(Player);
