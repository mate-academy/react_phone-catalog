import { Colors, Good, Sizes } from '../types/Good';

export const getFilteredItems = (
  array: Good[],
  filterParams: string[][],
) => {
  const filteredArray = array.filter(item => {
    const matches = filterParams.every(paramGroup => {
      const typeMatch = paramGroup
        .some(type => type === item.type);

      const dropMatch = paramGroup
        .some(drop => drop === item.drop);

      const sizeMatch = paramGroup
        .some(size => item.sizes.includes(size as Sizes));

      const colorMatch = paramGroup
        .some(color => item.colors.includes(color as Colors));

      const yearMatch = paramGroup
        .some(year => +year === item.year);

      return typeMatch && dropMatch && sizeMatch && colorMatch && yearMatch;
    });

    return matches;
  });

  return filteredArray;
};
