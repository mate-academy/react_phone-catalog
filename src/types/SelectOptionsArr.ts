import { SelectAmountItems } from './SelectAmountItems';
import { SortByOptions } from './SortByOptions';

export const sortByOptions = [
  { text: 'Newest', value: SortByOptions.AGE },
  { text: 'Cheapest', value: SortByOptions.PRICE },
  { text: 'Alphabetically', value: SortByOptions.NAME },
];
export const itemsOnPageOptions = [
  { text: '4', value: SelectAmountItems.FORTH },
  { text: '8', value: SelectAmountItems.EIGHT },
  { text: '16', value: SelectAmountItems.SIXTEEN },
  { text: 'ALL', value: SelectAmountItems.ALL },
];
