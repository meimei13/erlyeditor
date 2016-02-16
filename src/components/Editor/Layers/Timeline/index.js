import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import Slider from '../../../Slider';
import styles from './styles';

const { string } = PropTypes;

export class Timeline extends Component {
  static propTypes = {
    className: string
  };

  render() {
    const { className } = this.props;

    return (
      <div styleName='timeline' className={className}>
        {`its me, your timeline! add some behavior to me!`}
      </div>
    );
  }
}

export default css(Timeline, styles, { allowMultiple: true });
