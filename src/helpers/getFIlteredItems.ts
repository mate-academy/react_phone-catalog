import { Filter } from '../types/Filter';
import { Good } from '../types/Good';

export const getFilteredItems = (
  array: Good[],
  filterParams: Filter,
) => {
  const {
    type,
    drop,
    sizes,
    colors,
    year,
  } = filterParams;

  const filteredArray = array.filter(item => {
    const typeMatch = type.length ? type.includes(item.type) : true;
    const dropMatch = drop.length ? drop.includes(item.drop) : true;
    const sizeMatch = sizes.length
      ? item.sizes.some(size => sizes.includes(size))
      : true;

    const colorMatch = colors.length
      ? item.colors.some(color => colors.includes(color))
      : true;

    const yearMatch = year.length ? year.includes(item.year.toString()) : true;

    return typeMatch && dropMatch && sizeMatch && colorMatch && yearMatch;
  });

  return filteredArray;
};
