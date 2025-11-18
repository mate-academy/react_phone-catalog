import { PerPage, SortOrder } from '@shared/api';

const uiToApiMap = new Map<string, SortOrder | PerPage>([
  ['Newest', SortOrder.AGE],
  ['Alphabetically', SortOrder.TITLE],
  ['Cheapest', SortOrder.PRICE_ASC],
  ['4', PerPage.FOUR],
  ['8', PerPage.EIGHT],
  ['16', PerPage.SIXTEEN],
  ['all', PerPage.ALL],
]);

const apiToUIMap = new Map<string, string>([
  [SortOrder.AGE, 'Newest'],
  [SortOrder.TITLE, 'Alphabetically'],
  [SortOrder.PRICE_ASC, 'Cheapest'],
  [PerPage.FOUR, '4'],
  [PerPage.EIGHT, '8'],
  [PerPage.SIXTEEN, '16'],
  [PerPage.ALL, 'all'],
]);

export { uiToApiMap, apiToUIMap };
