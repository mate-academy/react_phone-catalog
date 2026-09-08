export type SortField<T> = {
  sortFieldName: keyof T;
  order: 'asc' | 'desc';
};
