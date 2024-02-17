export const createArray = (count: number) => {
  const arr = [];

  for (let i = 0; i < count; i += 1) {
    arr.push(i);
  }

  return arr;
};
