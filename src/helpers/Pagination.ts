export const ITEMS_PER_PAGE = 6;

export const loadMore = (
  itemsPerPage: number,
  activePage: number,
  totalItemsNumber: number,
) => (itemsPerPage * activePage >= totalItemsNumber ? null : activePage + 1);
