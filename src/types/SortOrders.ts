export const SortOrders = {
  desc: 'desc',
  asc: 'asc',
} as const;

export type SortOrdersType = keyof typeof SortOrders;
