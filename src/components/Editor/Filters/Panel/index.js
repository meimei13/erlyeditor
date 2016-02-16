import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import { filterTypeShape } from '../../../propTypes';
import List from '../../../List';

import Panel from '../../Panel';

import SearchBar from '../SearchBar';
import Filter from '../Filter';

import styles from './styles';

const { string, arrayOf } = PropTypes;

export class FiltersPanel extends Component {
  static propTypes = {
    className: string,
    filterTypes: arrayOf(filterTypeShape).isRequired
  };

  renderSearchBar() {
    return null;
  }

  render() {
    const {
      className,
      filterTypes
    } = this.props;

    return (
      <Panel collapsible
        expanded={false}
        className={cn(className, styles.panel)}
        headerClassName={styles.panelHeader}
        header={this.renderSearchBar()}
        title='filters'>
        {expanded =>
          <List className={styles.list}>
            {filterTypes.map(filter =>
              <List.Item key={filter.name}
                className={expanded ? styles.itemBig : styles.itemSmall}
                selectable
                disabled={filter.disabled}>
                <Filter {...filter} circle={!expanded} />
              </List.Item>
            )}
          </List>
        }
      </Panel>
    );
  }
}

export default css(FiltersPanel, styles, { allowMultiple: true });
