import React, { Component } from 'react';
import css from 'react-css-modules';

import { Editor } from 'erlyeditor';

import { sources } from '../videoSources';
import styles from './styles';

export class EditorDemo extends Component {
  render() {
    return (
      <div styleName='root'>
        <Editor className={styles.fullscreenEditor}
          source={sources[0]}
          player={{ width: 440, height: 200 }}
        />
      </div>
    );
  }
}

export default css(EditorDemo, styles);
