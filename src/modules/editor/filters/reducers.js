export function toggleLocked(state, { id }) {
  const filter = state[id];
  const locked = !filter.locked;

  return { ...state, [id]: { ...filter, locked } };
}

export function toggleVisibility(state, { id }) {
  const filter = state[id];
  const visible = !filter.visible;

  return { ...state, [id]: { ...filter, visible } };
}

export function move(state, { id, offset }) {
  const filter = state[id];
  const timeline = filter.timeline;

  return {
    ...state,
    [id]: {
      ...filter,
      timeline: { ...timeline, offset }
    }
  };
}

export function resize(state, { id, duration }) {
  const filter = state[id];
  const timeline = filter.timeline;

  return {
    ...state,
    [id]: {
      ...filter,
      timeline: { ...timeline, duration }
    }
  };
}
