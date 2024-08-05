export const suffle = <Type>(array: Type[]): Type[] => {
  const currentArray = [...array];
  let currentIndex = currentArray.length;

  while (currentIndex !== 0) {
    currentIndex--;

    const randomIndex = Math.floor(Math.random() * currentIndex);
    const temp = currentArray[currentIndex];

    currentArray[currentIndex] = currentArray[randomIndex];
    currentArray[randomIndex] = temp;
  }

  return currentArray;
};
