import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import Item from './Item';
import Subheader from './Subheader';
import Divider from './Divider';

import styles from './styles';

const { bool, string, node } = PropTypes;

export const List = (props) => {
  const {
    className,
    children,
    selectable,
    ...other
  } = props;

  return (
    <ul styleName='list'
      className={className}
      {...other }
      styles={undefined}>

      {React.Children.map(children, item =>
        item.type === Item ?
          React.cloneElement(item, {
            selectable: selectable || item.props.selectable
          }) :
          React.cloneElement(item)
      )}
    </ul>
  );
};

List.propTypes = {
  className: string,
  children: node,
  selectable: bool
};

List.Subheader = Subheader;
List.Item = Item;
List.Divider = Divider;

export default css(List, styles, { allowMultiple: true });
