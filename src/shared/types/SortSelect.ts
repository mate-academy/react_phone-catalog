export const SORT_BY = {
  AGE: 'age',
  TITLE: 'title',
  PRICE: 'price',
} as const;

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];

export type SelectOption = {
  value: string;
  label: string;
};

export function isSortBy(value: string | null): value is SortBy {
  return (
    value === SORT_BY.AGE || value === SORT_BY.TITLE || value === SORT_BY.PRICE
  );
}
