export type ItemsQuantity = Record<number, number>;

export type PagesDetails = {
  title: string;
  models: number;
  itemsQuantity: ItemsQuantity;
  verticalPaginationHeight: number;
  page: number;
  startShowFrom: number;
  disablePagesArrow: string;
};
