export const SORT_VALUES = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
};

export const SORT_OPTIONS = Object.entries(SORT_VALUES)
  .map(([key, value]) => ({ label: key, value }));
