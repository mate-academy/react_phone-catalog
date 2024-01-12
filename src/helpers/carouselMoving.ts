export const clickInPrev = (
  moving: number,
  setMoving: (m: number) => void,
  frameSize: number,
) => {
  if (moving - frameSize > 0) {
    setMoving(Math.max(moving - frameSize, 0));
  } else {
    setMoving(0);
  }
};

export const clickInNext = (
  moving: number,
  setMoving: (m: number) => void,
  itemsLength: number,
  frameSize: number,
) => {
  if (moving + frameSize < itemsLength - frameSize) {
    setMoving(Math.min(moving
      + frameSize, itemsLength - frameSize));
  } else {
    setMoving(itemsLength - frameSize);
  }
};
