export const sortTypes: SortType[] = [
  {
    name: 'Price: Low to High',
    field: 'price',
    typeField: 'number',
    type: 'cheap',
    isReverse: false,
  },
  {
    name: 'Price: High to Low',
    field: 'price',
    typeField: 'number',
    type: 'expensive',
    isReverse: true,
    isDefault: true,
  },
  {
    name: 'Goods :A to Z',
    field: 'name',
    typeField: 'string',
    type: 'alphabet',
    isReverse: false,
  },
  {
    name: 'Goods: Z to A',
    field: 'name',
    typeField: 'string',
    type: 'betalpha',
    isReverse: true,
  },
];

export const sortBy = (goods: Good[], sortType: SortType) => {

  if (sortType.typeField === 'number') {
    const sortedGoods = [...goods].sort((a, b) => {
      const direction = sortType.isReverse ? -1 : 1;

      return (Number(a[sortType.field]) - Number(b[sortType.field])) * direction;
    });

    return sortedGoods;
  }

  if (sortType.typeField === 'string') {
    return [...goods].sort((a, b) => {
      const direction = sortType.isReverse ? -1 : 1;

      return (String(a[sortType.field]).localeCompare(String(b[sortType.field]))) * direction;
    });
  }

  return goods;
};
