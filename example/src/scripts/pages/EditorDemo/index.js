import React, { Component } from 'react';
import css from 'react-css-modules';

import { Editor } from 'erlyeditor';

import { sources } from '../videoSources';
import styles from './styles';

import { HueRotate } from 'gl-react-hue-rotate';
import { Blur } from 'gl-react-blur';
import { ColorMatrix } from 'gl-react-color-matrix';
import { Negative } from 'gl-react-negative';
import { ContrastSaturationBrightness } from 'gl-react-contrast-saturation-brightness';

const filterTypeDefaults = {
  timeline: {
    offset: 0,
    duration: 10
  }
};

const filterRenderers = {
  hue: HueRotate,
  blur: Blur,
  colorMatrix: ColorMatrix,
  negative: Negative,
  csb: ContrastSaturationBrightness
};

const filterTypes = {
  blur: {
    layerTypes: ['effect'],
    name: 'blur',
    description: 'multi-pass gaussian Blur effect',
    appearance: { color: '#117442' },
    defaults: { factor: 2, passes: 4 },
    ...filterTypeDefaults
  },
  hue: {
    layerTypes: ['effect'],
    name: 'hue',
    description: 'hue rotate',
    appearance: { color: '#277686' },
    defaults: { hue: Math.PI },
    ...filterTypeDefaults
  },
  negative: {
    layerTypes: ['effect'],
    name: 'negative',
    description: 'negative',
    appearance: { color: '#ad8e00' },
    defaults: { factor: 0.5 },
    ...filterTypeDefaults
  },
  colorMatrix: {
    layerTypes: ['effect'],
    name: 'colorMatrix',
    description: 'applies 4x4 color matrix',
    appearance: { color: '#277686' },
    defaults: {
      // grayscale
      matrix: [
        0.3, 0.3, 0.3, 0,
        0.6, 0.6, 0.6, 0,
        0.1, 0.1, 0.1, 0,
        0, 0, 0, 1
      ]
    },
    ...filterTypeDefaults
  },
  csb: {
    layerTypes: ['effect'],
    name: 'csb',
    description: 'combines Contrast, Saturation and Brightness',
    appearance: { color: '#117442' },
    defaults: {
      contrast: 0.5,
      saturation: 0.5,
      brightness: 0.5
    },
    ...filterTypeDefaults
  }
};

export class EditorDemo extends Component {
  render() {
    return (
      <div styleName='root'>
        <Editor className={styles.fullscreenEditor}
          filterTypes={filterTypes}
          filterRenderers={filterRenderers}
          source={sources[0]}
          player={{ width: 640, height: 480 }}
        />
      </div>
    );
  }
}

export default css(EditorDemo, styles);
