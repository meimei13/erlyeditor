// modal contexts:
// ??

export default ({ common, dunno }) => [
  {
    name: 'dunno',
    actions: [
      {
        title: 'split',
        description: 'split',
        icon: 'content_cut',
        handler: dunno.split,
        tooltipTop: true,
        tooltipDelay: 400,
        disabled: true,
        small: true
      }
    ]
  },
  {
    name: 'common',
    actions: [
      {
        title: 'undo',
        description: 'undo',
        icon: 'undo',
        small: true,
        handler: common.undo,
        tooltipTop: true,
        tooltipDelay: 800,
        disabled: true
      },
      {
        title: 'redo',
        description: 'redo',
        icon: 'redo',
        small: true,
        handler: common.redo,
        tooltipTop: true,
        tooltipDelay: 800,
        disabled: true
      }
    ]
  }
];
