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

import {
  videoProps,
  videoActionsShape,
  playerActionsShape,
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
import PropertyEditor from './PropertyEditor';
import Inspector from './Inspector';

import FilterTypeDragPreview from './Filters/FilterDragPreview';
import FilterDragPreview from './Layers/Layer/FilterDragPreview';
import LayerDragPreview from './Layers/LayerDragPreview';

import styles from './styles';

const { bool, number, string, arrayOf, shape } = PropTypes;

// preview components for
// various draggable item types
const previews = {
  filterType: FilterTypeDragPreview,
  filter: FilterDragPreview,
  layer: LayerDragPreview
};

export class Editor extends Component {
  static propTypes = {
    className: string,

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

    video: shape(videoProps).isRequired
  };

  static defaultProps = {
    snapToGrid: true,
    cellSize: 10
  };

  state = {
    snapToGrid: this.props.snapToGrid,
    cellSize: this.props.cellSize
  };

  render() {
    const {
      className,
      source,
      filterTypes,
      layers,
      actions,
      video,
      player: {
        width,
        height,
        ...player
      }
    } = this.props;

    const size = { width, height };
    const { snapToGrid, cellSize } = this.state;

    const layersPanelProps = {
      snapToGrid,
      cellSize,
      layers,
      filterTypes
    };

    return (
      <div styleName='editor' className={className}>
        <div styleName='main'>
          <FiltersPanel filterTypes={filterTypes} />
          <Player actions={actions.player}
            width={width}
            { ...{ ...player, video } }>
            <Html5Video preload='auto'
              { ...{ ...size, ...video } }
              actions={actions.video}
              src={source}
            />
          </Player>
          <Inspector layers={layers} />
        </div>
        <MainToolbar />
        <MainPanel>
          <LayersPanel {...layersPanelProps }
            actions={pick(actions, 'layer', 'filter')}
          />
          <PropertyEditor />
        </MainPanel>
        <CustomDragLayer {...{ snapToGrid, cellSize, previews } } />
      </div>
    );
  }
}

const actionsMap = {
  player: playerActions,
  video: videoActions,
  layer: layerActions,
  filter: filterActions
};

const selectActions = dispatch => ({
  actions: mapValues(actionsMap, actions => bindActionCreators(actions, dispatch))
});

/* eslint-disable new-cap */
export default flow(
  css(styles, { allowMultiple: true }),
  connect(selector, selectActions),
  DragDropContext(HTML5Backend)
)(Editor);
/* eslint-enable new-cap */
