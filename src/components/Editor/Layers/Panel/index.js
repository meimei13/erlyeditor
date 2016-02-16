import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import {
  filterTypeShape,
  layerShape,
  layerActionsShape,
  filterActionsShape
} from '../../../propTypes';

import tooltip from '../../../hoc/tooltip';
import List from '../../../List';
import Button from '../../../Button';

import Panel from '../../Panel';
import ContextToolbar from '../../ContextToolbar';

import Timeline from '../Timeline';
import ZoomSlider from '../ZoomSlider';
import Layer from '../Layer';

import getContextActions from './getContextActions';
import styles from './styles';

const TooltipButton = tooltip(Button);
const {
  bool,
  number,
  string,
  node,
  arrayOf,
  shape
} = PropTypes;

export class LayersPanel extends Component {
  static propTypes = {
    className: string,
    children: node,

    layers: arrayOf(layerShape).isRequired,
    filterTypes: arrayOf(filterTypeShape).isRequired,

    snapToGrid: bool,
    cellSize: number,

    actions: shape({
      layer: layerActionsShape.isRequired,
      filter: filterActionsShape.isRequired
    })
  };

  renderFooter() {
    return null;
  }

  render() {
    const {
      className,
      children,
      layers,
      filterTypes,
      snapToGrid,
      cellSize,
      actions
    } = this.props;

    const layerProps = {
      snapToGrid,
      cellSize,
      filterTypes,
      actions
    };

    return (
      <Panel className={cn(className, styles.panel)}
        contentClassName={styles.content}
        footer={this.renderFooter()}>
        {/*<Timeline />*/}
        <List>
          {layers.map(layer =>
            <List.Item key={layer.id}>
              <Layer {...{ ...layer, ...layerProps } } />
            </List.Item>
          )}
          {children}
        </List>
      </Panel>
    );
  }
}

export default css(LayersPanel, styles, { allowMultiple: true });
