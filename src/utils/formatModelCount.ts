export const formatModelCount = (count: number): string => {
  return `${count} ${count === 1 ? 'model' : 'models'}`;
};
