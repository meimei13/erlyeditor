import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import tooltip from '../../../../../hoc/tooltip';

import ButtonGroup from '../../../../../ButtonGroup';
import Button from '../../../../../Button';

import styles from './styles';

const TooltipButton = tooltip(Button);
const { bool, func } = PropTypes;

export class Controls extends Component {
  static propTypes = {
    disabled: bool,
    locked: bool,
    single: bool,
    expanded: bool,
    onToggleLocked: func,
    onToggleDisabled: func,
    onToggleSingle: func,
    onToggleExpanded: func
  };

  render() {
    const {
      disabled,
      locked,
      single,
      expanded,
      onToggleLocked,
      onToggleDisabled,
      onToggleSingle,
      onToggleExpanded
    } = this.props;

    return (
      <ButtonGroup className={styles.controls} neutral small>
        <TooltipButton
          icon={single ? 'adjust' : 'lens'}
          onClick={onToggleSingle}
        />
        <TooltipButton
          icon={locked ? 'lock_open' : 'lock_outline' }
          onClick={onToggleLocked}
        />
        <TooltipButton
          icon={disabled ? 'visibility' : 'visibility_off'}
          onClick={onToggleDisabled}
        />
        <TooltipButton
          icon={expanded ? 'expand_less' : 'expand_more'}
          onClick={onToggleExpanded}
        />
      </ButtonGroup>
    );
  }
}

export default css(Controls, styles);
