import React, { Component } from 'react';
import css from 'react-css-modules';

import { filterProps } from '../../../propTypes';
import Filter from '../Filter';
import styles from './styles';

export class FilterDragPreview extends Component {
  static propTypes = filterProps;

  render() {
    return (
      <div styleName='filter-drag-preview'>
        <Filter {...this.props} />
      </div>
    );
  }
}

export default css(FilterDragPreview, styles);
