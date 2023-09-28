export const getQuantityWithoutSame = (items: string[]) => {
  const allTypes: string[] = [];

  items.forEach(id => {
    if (!allTypes.includes(id)) {
      allTypes.push(id);
    }
  });

  return allTypes.length;
};
