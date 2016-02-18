import flow from 'lodash/flow';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import css from 'react-css-modules';

import { selector } from '../../modules/editor';

import * as layerActions from '../../modules/editor/layers/actions';
import * as filterActions from '../../modules/editor/filters/actions';
import * as videoActions from '../../modules/html5video/actions';
import * as playerActions from '../../modules/player/actions';
import * as editorActions from '../../modules/editor/actions';

import {
  videoProps,
  videoActionsShape,
  playerActionsShape,

  layerTypeShape,
  filterTypeShape,

  layerShape
} from '../propTypes';

import Player from '../Player';
import Html5Video from '../Html5Video';

import CustomDragLayer from './CustomDragLayer';
import MainToolbar from './MainToolbar';
import MainPanel from './MainPanel';
import { Panel as FiltersPanel } from './Filters';
import { Panel as LayersPanel } from './Layers';
import Timeline from './Timeline';
import PropertyEditor from './PropertyEditor';
import Inspector from './Inspector';

const FilterChainSurface = __CLIENT__ ?
  require('./FilterChainSurface').default :
  void 0;

// ^---- its just a draft version, right? (:
// TODO: there are defenitely a better way to make SSR work

import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  arrayOf,
  shape
} = PropTypes;

export class Editor extends Component {
  static propTypes = {
    className: string,

    layerTypes: object.isRequired,
    filterTypes: arrayOf(filterTypeShape).isRequired,
    layers: arrayOf(layerShape).isRequired,

    snapToGrid: bool,
    cellSize: number,

    source: string.isRequired,

    actions: shape({
      video: videoActionsShape.isRequired,
      player: playerActionsShape.isRequired
    }),

    player: shape({
      width: number,
      height: number,
      debug: bool
    }).isRequired,

    video: shape(videoProps).isRequired,

    filterRenderers: object
  };

  static defaultProps = {
    snapToGrid: true,
    cellSize: 10
  };

  state = {
    snapToGrid: this.props.snapToGrid,
    cellSize: this.props.cellSize
  };

  api = {
    toggleMute: () => this.video.toggleMute(),
    toggleLoop: () => this.video.toggleLoop(),
    togglePlay: () => this.video.togglePlay(),
    toggleFullScreen: () => this.video.toggleFullScreen(),
    setVolume: v => this.video.setVolume(v),
    setPlaybackRate: v => this.video.setPlaybackRate(v),
    seek: offset => this.video.seek(offset)
  };

  renderVideo(size) {
    const {
      video,
      source,
      actions
    } = this.props;

    return (
      <Html5Video ref={r => this.video = r}
        preload='auto'
        src={source}
        actions={actions.video}
        { ...{ ...size, ...video } }
      />
    );
  }

  renderPlayer() {
    const {
      layers,
      filterRenderers,
      actions,
      video,
      player: {
        width,
        height,
        ...player
      }
    } = this.props;

    const size = { width, height };
    const playerProps = {
      ...player,
      api: this.api,
      actions: actions.player,
      width,
      video
    };

    const filters = this.props.filters.filter(
      ({ layerId }) => layers.find(l => l.id === layerId).presentational
    );
    // ^----- sorry for this, I need to get it working,
    // will come back here later, promise

    const videoEl = this.renderVideo(size);

    return (
      <Player {...playerProps}>
        {FilterChainSurface ?
          <FilterChainSurface {...size}
            filters={filters}
            renderers={filterRenderers} >
            {videoEl}
          </FilterChainSurface> :
          videoEl
        }
      </Player>
    );
  }

  render() {
    const {
      className,
      filterTypes,
      video,
      layers,
      actions
    } = this.props;

    const {
      snapToGrid,
      cellSize
    } = this.state;

    const layersPanelProps = {
      snapToGrid,
      cellSize,
      layers,
      filterTypes,
      duration: video.duration
    };

    return (
      <div styleName='editor' className={className}>
        <div styleName='main'>
          <FiltersPanel
            filterTypes={filterTypes}
            onCreateFilter={actions.editor.createFilter}
          />
          {this.renderPlayer()}
          {/*<Inspector layers={layers} />*/}
        </div>
        <MainToolbar />
        <MainPanel>
          <LayersPanel {...layersPanelProps}
            actions={pick(actions, 'layer', 'filter')}>
            <Timeline {...video} onSeek={this.api.seek} />
          </LayersPanel>
          <PropertyEditor />
        </MainPanel>
        <CustomDragLayer { ...{ snapToGrid, cellSize } } /> </div>
    );
  }
}

const actionsMap = {
  player: playerActions,
  video: videoActions,
  layer: layerActions,
  filter: filterActions,
  editor: editorActions
};

const selectActions = dispatch => ({
  actions: mapValues(
    actionsMap,
    actions => bindActionCreators(actions, dispatch)
  )
});

/* eslint-disable new-cap */
export default flow(
  css(styles, { allowMultiple: true }),
  connect(selector, selectActions),
  DragDropContext(HTML5Backend)
)(Editor);
/* eslint-enable new-cap */
