export const shuffle = <T>(arr: T[]): T[] => {
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    const newIndex = Math.floor(Math.random() * newArr.length);

    [newArr[i], newArr[newIndex]] = [newArr[newIndex], newArr[i]];
  }

  return newArr;
};
