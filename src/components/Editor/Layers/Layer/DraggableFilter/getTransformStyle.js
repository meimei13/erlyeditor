export default ({ offset }) => {
  const transform = `translate3d(${offset}px, 0, 0)`;

  return {
    transform,
    WebkitTransform: transform
  };
};
