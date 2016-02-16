export default {
  cut1: {
    id: 'cut1',
    type: 'cut',
    visible: true,
    locked: false,
    timeline: {
      offset: 30,
      duration: 210
    },
    appearance: {
      color: '#232c32'
    }
  },
  cut2: {
    id: 'cut2',
    type: 'cut',
    visible: true,
    locked: false,
    timeline: {
      offset: 250,
      duration: 80
    },
    appearance: {
      color: '#232c32'
    }
  },
  cut3: {
    id: 'cut3',
    type: 'cut',
    visible: true,
    locked: true,
    timeline: {
      offset: 400,
      duration: 100
    },
    appearance: {
      color: '#232c32'
    }
  },
  overlay1: {
    id: 'overlay1',
    type: 'overlay',
    visible: false,
    locked: false,
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
    type: 'blur',
    visible: false,
    locked: true,
    timeline: {
      offset: 320,
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
    type: 'hue',
    visible: true,
    locked: false,
    timeline: {
      offset: 280,
      duration: 320
    },
    attributes: {
      value: 0.6
    },
    appearance: {
      color: '#277686'
    }
  }
};
