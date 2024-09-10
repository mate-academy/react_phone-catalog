export type ItemsPerPageOptions = 4 | 8 | 16 | 'All';

export const ITEMS_PER_PAGE_OPTIONS: ItemsPerPageOptions[] = [4, 8, 16, 'All'];

export interface DropDownItemsPerPage {
  name: 'Items on page';
  urlSearchName: 'perPage';
  values: ItemsPerPageOptions[];
}
