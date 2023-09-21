export const getUniqueArray = (array: any[]) => {
  const result: any[] = [];

  array.forEach((item) => {
    if (Array.isArray(item)) {
      const uniqueItems = getUniqueArray(item);

      uniqueItems.forEach((uniqueItem) => {
        if (!result.includes(uniqueItem)) {
          result.push(uniqueItem);
        }
      });
    } else if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
};
