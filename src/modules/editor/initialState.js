// layerType  [1] - [*] layers [1]  - [*] filters
// filterType [1] - [*] filters [1] - [1] layer

const layerTypes = {
  video: {
    name: 'video',
    description: 'video timeline layer',
    behavioral: true,
    presentational: false
  },
  effect: {
    name: 'effect',
    description: 'effects layer',
    behavioral: true,
    presentational: true
  }
};

const filterTypeDefaults = {
  timeline: {
    offset: 0,
    duration: 10
  }
};

const filterTypes = {
  cut: {
    layerTypes: ['video'],
    name: 'cut',
    description: 'lets you cut a part of the video',
    appearance: {
      color: '#232c32'
    },
    ...filterTypeDefaults
  },
  overlay: {
    layerTypes: ['effect'],
    name: 'overlay',
    description: 'Use the power of rectangle!',
    appearance: {
      color: '#993333'
    },
    defaults: {
      x1: 10,
      y1: 20,
      x2: 100,
      y2: 120
    },
    editor: {
      x1: { type: 'number' },
      y1: { type: 'number' },
      x2: { type: 'number' },
      y2: { type: 'number' }
    },
    ...filterTypeDefaults
  },
  blur: {
    layerTypes: ['effect'],
    name: 'blur',
    description: '',
    appearance: {
      color: '#ad8e00'
    },
    defaults: {
      factor: 2,
      passes: 4
    },
    ...filterTypeDefaults
  },
  hue: {
    layerTypes: ['effect'],
    name: 'hue',
    description: '',
    appearance: {
      color: '#277686'
    },
    defaults: {
      hue: 140
    },
    ...filterTypeDefaults
  },
  negative: {
    layerTypes: ['effect'],
    name: 'negative',
    description: '',
    appearance: {
      color: '#277686'
    },
    defaults: {
      factor: 1
    },
    ...filterTypeDefaults
  }
};

export default {
  activeFilters: [],

  snapToGrid: true,
  cellSize: 10,

  layerTypes,
  filterTypes
};
