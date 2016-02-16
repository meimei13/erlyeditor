// layerType  [1] - [*] layers [1]  - [*] filters
// filterType [1] - [*] filters [1] - [1] layer

const layerTypes = {
  video: {
    name: 'video',
    description: 'video timeline layer'
  },
  effect: {
    name: 'effect',
    description: 'effects layer'
  }
};

const filterTypes = {
  cut: {
    layerTypes: ['video'],
    name: 'cut',
    description: 'lets you cut a part of video',
    appearance: {
      color: '#232c32'
    },
    timeline: {
      offset: 0,
      duration: 100
    }
  },
  overlay: {
    layerTypes: ['effect'],
    name: 'overlay',
    description: '',
    appearance: {
      color: '#993333'
    },
    defaults: {
      x1: 10,
      y1: 20,
      x2: 100,
      y2: 120
    },
    timeline: {
      offset: 0,
      duration: 100
    },
    editor: {
      x1: { type: 'number' },
      y1: { type: 'number' },
      x2: { type: 'number' },
      y2: { type: 'number' }
    }
  },
  blur: {
    layerTypes: ['effect'],
    filters: ['blur1'],
    name: 'blur',
    description: '',
    appearance: {
      color: '#117442'
    },
    defaults: {
      value: 0.7
    },
    timeline: {
      offset: 0,
      duration: 100
    }
  },
  hue: {
    layerTypes: ['effect'],
    filters: ['hue1'],
    name: 'hue',
    description: '',
    appearance: {
      color: '#277686'
    },
    defaults: {
      value: 0.5
    },
    timeline: {
      offset: 0,
      duration: 100
    }
  }
};

export default {
  snapToGrid: true,
  cellSize: 10,

  layerTypes,
  filterTypes
};
