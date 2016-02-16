import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import tooltip from '../../../../../hoc/tooltip';
import Badge from '../../../../../Badge';
import Button from '../../../../../Button';
import ButtonGroup from '../../../../../ButtonGroup';

import styles from './styles';

const TooltipButton = tooltip(Button);
const { bool, func } = PropTypes;

export const Controls = props => {
  const {
    disabled,
    onDestroy,
    onToggleDisabled
  } = props;

  return (
    <div styleName='filter-controls'>
      <ButtonGroup small buttonClassName={styles.filterButton}>
        <TooltipButton
          neutral
          icon='delete'
          tooltipTop
          tooltipDelay={1200}
          tooltipText='remove filter slice'
          onClick={onDestroy}
        />
        <TooltipButton
          neutral
          icon={disabled ? 'visibility' : 'visibility_off'}
          tooltipTop
          tooltipDelay={1200}
          tooltipText={disabled ? 'enable' : 'disable'}
          onClick={onToggleDisabled}
        />
      </ButtonGroup>
    </div>
  );
};

Controls.propTypes = {
  disabled: bool,
  onDestroy: func.isRequired,
  onToggleDisabled: func.isRequired
};

export default css(Controls, styles);
