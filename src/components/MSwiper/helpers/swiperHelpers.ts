export function toggleTrackClass(track: HTMLUListElement, drag: null | number) {
  track.classList.toggle('swiper__track--dragging', drag !== null);
  track.classList.toggle('swiper__track--animated', drag === null);
}

export function getIndex(offset: number, width: number) {
  const index = Math.round(offset / width);

  return index;
}

export function clamps(
  clmp: boolean,
  max: number,
  rawDrag: number,
  offset: number,
) {
  if (clmp) {
    if (rawDrag - offset <= -max) {
      return -max + offset;
    } else if (-rawDrag + offset <= 0) {
      return -offset;
    } else {
      return rawDrag;
    }
  } else {
    return rawDrag;
  }
}
