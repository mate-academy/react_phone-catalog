import { FilterItems } from '../types/FilterItems';
import { Colors, Good, Sizes } from '../types/Good';

export const getFilteredItems = (
  array: Good[],
  filterParams: FilterItems,
) => {
  let filteredArray = array;

  filteredArray = filteredArray.filter(item => {
    const byType = filterParams.type
      ? filterParams.type.includes(item.type)
      : true;

    const byDrop = filterParams.drop
      ? filterParams.drop.includes(item.drop)
      : true;

    const bySize = filterParams.sizes
      ? filterParams.sizes.some(size => item.sizes.includes(size as Sizes))
      : true;

    const byColor = filterParams.colors
      ? filterParams.colors.some(color => item.colors.includes(color as Colors))
      : true;

    const byYear = filterParams.year
      ? filterParams.year.includes(item.year.toString())
      : true;

    return byType && byDrop && bySize && byColor && byYear;
  });

  return filteredArray;
};
