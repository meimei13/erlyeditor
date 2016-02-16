export default {
  main: {
    id: 'main',
    type: 'video',
    filters: ['cut1', 'cut2', 'cut3'],
    order: 1,
    editable: false,
    disabled: false,
    locked: false,
    single: false
  },
  layer1: {
    id: 'layer1',
    type: 'effect',
    filters: ['overlay1', 'blur1'],
    order: 2,
    editable: true,
    disabled: false,
    locked: false,
    single: false
  },
  layer2: {
    id: 'layer2',
    type: 'effect',
    filters: ['hue1'],
    order: 3,
    editable: true,
    disabled: false,
    locked: false,
    single: false
  }
};
