export const clickInPrev = (
  moving: number,
  setMoving: (m: number) => void,
) => {
  if (moving - 2 > 0) {
    setMoving(Math.max(moving - 2, 0));
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
  if (moving + 2 < itemsLength - frameSize) {
    setMoving(Math.min(moving
      + 2, itemsLength - frameSize));
  } else {
    setMoving(itemsLength - frameSize);
  }
};
