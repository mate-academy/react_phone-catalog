export const getCapacityInGB = (capacity: string) => {
  const value = parseFloat(capacity);

  if (capacity.toLowerCase().includes('tb')) {
    return value * 1024;
  }

  return value;
};
