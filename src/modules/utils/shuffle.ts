// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffle = ([...arr]) => {
  let m = arr.length;

  while (m) {
    const i = Math.floor(Math.random() * m--);

    // eslint-disable-next-line no-param-reassign
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }

  return arr;
};
