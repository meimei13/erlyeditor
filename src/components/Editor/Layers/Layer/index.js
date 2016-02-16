import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import {
  filterShape,
  filterActionsShape,
  layerActionsShape
} from '../../../propTypes';

import Header from './Header';
import Surface from './Surface';

import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  arrayOf,
  shape
} = PropTypes;

export class Layer extends Component {
  static propTypes = {
    className: string,
    snapToGrid: bool,
    cellSize: number,

    id: string.isRequired,
    name: string.isRequired,
    description: string.isRequired,
    type: string.isRequired,
    attributes: object,
    filters: arrayOf(filterShape),
    editable: bool,
    disabled: bool,
    locked: bool,
    single: bool,

    actions: shape({
      layer: layerActionsShape.isRequired,
      filter: filterActionsShape.isRequired
    })
  };

  state = { expanded: true };

  @autobind
  handleToggleExpanded() {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
  }

  @autobind
  handleMoveFilter(id, offset) {
    this.props.actions.filter.update(id, { offset });
  }

  @autobind
  handleDestroyFilter(id) {
    this.props.actions.layer.removeFilter(this.props.id, id);
    this.props.actions.filter.destroy(id);
  }

  @autobind
  handleToggleDisabled(id) {
    this.props.actions.filter.toggleDisabled(id);
  }

  render() {
    const {
      className,
      snapToGrid,
      cellSize,

      id,
      name,
      description,
      type,
      editable,
      disabled,
      locked,
      single,
      filters
    } = this.props;

    const { expanded } = this.state;

    const headerProps = {
      name,
      description,
      editable,
      disabled,
      locked,
      single,
      expanded
    };

    const surfaceProps = {
      snapToGrid,
      cellSize,
      filters
    };

    return (
      <div styleName='layer' className={className}>
        <Header {...headerProps}
          onToggleExpanded={this.handleToggleExpanded}
        />
        <Surface {...surfaceProps}
          onMove={this.handleMoveFilter}
          onDestroy={this.handleDestroyFilter}
          onToggleDisabled={this.handleToggleDisabled}
        />
      </div>
    );
  }
}

Layer.Header = Header;
Layer.Surface = Surface;

export default css(Layer, styles, { allowMultiple: true });
