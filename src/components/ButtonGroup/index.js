import React, { PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import styles from './styles';

const { bool, string, node } = PropTypes;

export const ButtonGroup = props => {
  const {
    className,
    buttonClassName,
    children,
    filled,
    big,
    small,
    ...other
  } = props;

  const size = small ? 'small' : big ? 'big' : 'normal';
  const fill = filled ? 'filled' : 'neutral';
  const styleName = cn('button-group', size, fill);

  const known = { styleName, className };

  return (
    <ul { ...{ ...known, ...other } } styles={undefined}>
      {React.Children.map(children, button =>
        button &&
          React.cloneElement(button, {
            className: cn(button.props.className, buttonClassName, styles.button),
            filled: filled || button.props.filled,
            big: big || button.props.big,
            small: small || button.props.small
          })
      )}
    </ul>
  );
};

ButtonGroup.propTypes = {
  className: string,
  buttonClassName: string,
  children: node.isRequired,
  filled: bool,
  small: bool,
  big: bool
};

ButtonGroup.defaultProps = {
  filled: false,
  small: false,
  big: false
};

export default css(ButtonGroup, styles, { allowMultiple: true });
