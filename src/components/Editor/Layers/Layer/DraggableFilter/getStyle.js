export default props => {
  const { timeline: { offset } } = props;
  const transform = `translate3d(${offset}px, 0, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  };
};
