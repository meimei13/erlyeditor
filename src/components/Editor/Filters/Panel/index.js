import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import { filterTypeShape } from '../../../propTypes';
import List from '../../../List';

import Panel from '../../Panel';

import SearchBar from '../SearchBar';
import DraggableFilter from '../DraggableFilter';

import styles from './styles';

const { string, func, arrayOf } = PropTypes;

export class FiltersPanel extends Component {
  static propTypes = {
    className: string,
    filterTypes: arrayOf(filterTypeShape).isRequired,
    onCreateFilter: func.isRequired
  };

  renderSearchBar() {
    return null;
  }

  render() {
    const {
      className,
      filterTypes,
      onCreateFilter
    } = this.props;

    return (
      <Panel collapsible
        expanded={false}
        className={cn(className, styles.panel)}
        headerClassName={styles.panelHeader}
        contentClassName={styles.panelContent}
        header={this.renderSearchBar()}
        title='filters'>

        {expanded =>
          <List vertical={!expanded}
            className={expanded ? styles.listExpanded : styles.listCollapsed}>

            {filterTypes.map(filter =>
              <List.Item key={filter.name}
                className={expanded ? styles.itemBig : styles.itemSmall}
                disabled={filter.disabled}>

                <DraggableFilter {...filter}
                  onCreateFilter={onCreateFilter}
                  circle={!expanded}
                />
              </List.Item>
            )}
          </List>
        }
      </Panel>
    );
  }
}

export default css(FiltersPanel, styles, { allowMultiple: true });
