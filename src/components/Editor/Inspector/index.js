import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import { layerShape } from '../../propTypes';
import tooltip from '../../hoc/tooltip';
import Input from '../../Input';
import Button from '../../Button';
import Panel from '../Panel';

import styles from './styles';

const TooltipButton = tooltip(Button);
const { arrayOf } = PropTypes;

export class Inspector extends Component {
  static propTypes = {
    layers: arrayOf(layerShape).isRequired
  };

  render() {
    const { layers } = this.props;
    const state = JSON.stringify(layers);

    return (
      <Panel title='inspector'
        className={styles.panel}
        contentClassName={styles.content}>
        <Input multiline
          className={styles.container}
          inputClassName={styles.input}
          value={state}
        />
        <TooltipButton icon='done'
          raised
          className={styles.button}
          tooltipTop
          tooltipDelay={1000}
          tooltipText='load layers data'
        />
      </Panel>
    );
  }
}

export default css(Inspector, styles);
