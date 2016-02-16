export default {
  cut1: {
    id: 'cut1',
    layerId: 'main',
    type: 'cut',
    disabled: false,
    timeline: {
      offset: 30,
      duration: 210
    },
    appearance: {
      color: '#ad8e00'
    }
  },
  cut2: {
    id: 'cut2',
    layerId: 'main',
    type: 'cut',
    disabled: false,
    timeline: {
      offset: 250,
      duration: 80
    },
    appearance: {
      color: '#ad8e00'
    }
  },
  cut3: {
    id: 'cut3',
    layerId: 'main',
    type: 'cut',
    disabled: true,
    timeline: {
      offset: 400,
      duration: 100
    },
    appearance: {
      color: '#ad8e00'
    }
  },
  overlay1: {
    id: 'overlay1',
    layerId: 'layer1',
    type: 'overlay',
    disabled: false,
    timeline: {
      offset: 10,
      duration: 100
    },
    attributes: {
      x1: 12,
      y1: 32,
      x2: 412,
      y2: 500
    },
    appearance: {
      color: '#993333'
    }
  },
  blur1: {
    id: 'blur1',
    layerId: 'layer1',
    type: 'blur',
    disabled: true,
    timeline: {
      offset: 210,
      duration: 100
    },
    attributes: {
      value: 0.4
    },
    appearance: {
      color: '#117442'
    }
  },
  hue1: {
    id: 'hue1',
    layerId: 'layer2',
    type: 'hue',
    disabled: false,
    timeline: {
      offset: 120,
      duration: 60
    },
    attributes: {
      value: 0.6
    },
    appearance: {
      color: '#277686'
    }
  }
};
