export const imgWidth = 1040 + 48;

export const itemWidth = 272 + 16;

export const scrollPositionRight = (
  callback: (newPosition: number) => void,
  state: number,
  width: number,
) => {
  const newPosition = state - width;

  callback(newPosition);
};

export const scrollPositionLeft = (
  // value: string,
  callback: (newPosition: number) => void,
  state: number,
  width: number,
) => {
  const newPosition = state + width;

  callback(newPosition);
};
