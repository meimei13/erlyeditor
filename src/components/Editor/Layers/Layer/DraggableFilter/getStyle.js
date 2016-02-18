export default ({ x }) => {
  const transform = `translate3d(${x}px, 0, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  };
};
