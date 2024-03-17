export const mainUrl = "https://mate-academy.github.io/react_phone-catalog";

export const imgWidth = 1040 + 48;

export const itemWidth = 272 + 16;

export const scrollPositionRight = (
  callback: (newPosition: number) => void,
  state: number,
  width: number,
  count = 1,
) => {
  const newPosition = state - width * count;

  callback(newPosition);
};

export const scrollPositionLeft = (
  // value: string,
  callback: (newPosition: number) => void,
  state: number,
  width: number,
  count = 1,
) => {
  const newPosition = state + width * count;

  callback(newPosition);
};
