export enum PerPage {
  perPage4 = 4,
  perPage8 = 8,
  perPage16 = 16,
  perPageAll = -1,
}

export enum SortBy {
  age = 'Newest',
  name = 'Name',
  price = 'Cheapest',
}

export const SortByOptions = Object.keys(SortBy).map(key => {
  const k = key as keyof typeof SortBy;

  return {
    key: k,
    value: SortBy[k],
  };
});

export const PerPageOptions = Object.entries(PerPage).reduce(
  (total, key) => {
    if (typeof key[0] === 'string' && typeof key[1] === 'number') {
      const option = {
        key: String(key[1]),
        value: key[1] === -1 ? 'All' : String(key[1]),
      };

      total.push(option);
    }

    return total;
  },
  [] as Array<{ key: string; value: string }>,
);
