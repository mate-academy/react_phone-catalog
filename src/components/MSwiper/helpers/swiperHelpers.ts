import { SwiperData } from '../../MySwiperProto/types/MSPtypes';

export function toggleTrackClass(track: HTMLUListElement, drag: null | number) {
  track.classList.toggle('swiper__track--dragging', drag !== null);
  track.classList.toggle('swiper__track--animated', drag === null);
}

export function getIndex(offset: number, width: number) {
  const index = Math.round(offset / width);

  return index;
}

export function clamps(
  clamp: boolean,
  max: number,
  rawDrag: number,
  offset: number,
) {
  if (clamp) {
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

export function renderListCreate(dataset: SwiperData[], infinite: boolean) {
  let list;

  if (!infinite) {
    list = [...dataset];
  } else {
    list = [
      { ...dataset[dataset.length - 2] },
      { ...dataset[dataset.length - 1] },
      ...dataset.map(item => ({ ...item })),
      { ...dataset[0] },
      { ...dataset[1] },
    ];
  }

  const renderList = list.map((item, idx) => ({ id: idx, ...item }));

  return renderList;
}
