export const clickInPrev = (
  moving: number,
  setMoving: (m: number) => void,
) => {
  if (moving - 4 > 0) {
    setMoving(Math.max(moving - 4, 0));
  } else {
    setMoving(0);
  }
};

export const clickInNext = (
  moving: number,
  setMoving: (m: number) => void,
  itemsLength: number,
) => {
  if (moving + 4 < itemsLength - 4) {
    setMoving(Math.min(moving
      + 4, itemsLength - 4));
  } else {
    setMoving(itemsLength - 4);
  }
};
