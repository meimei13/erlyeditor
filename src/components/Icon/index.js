import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './styles';

const { bool, string, any } = PropTypes;

export const Icon = (props) => {
  const {
    children,
    className,
    value,
    small,
    big,
    ...other
  } = props;

  let styleName = small ? 'small' : 'normal';
  if (small) {
    styleName = 'small';
  } else if (big) {
    styleName = 'big';
  } else {
    styleName = 'normal';
  }

  return (
    <span { ...{ ...{ className, styleName }, ...other } }>
      {value}
      {children}
    </span>
  );
};

Icon.propTypes = {
  children: any,
  className: string,
  small: bool,
  big: bool,
  value: string.isRequired
};

Icon.defaultProps = {
  small: false,
  big: false
};

export default css(Icon, styles, { allowMultiple: true });
