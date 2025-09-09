import { ItemsAmount, Order } from '@shared/api';

const uiToApiMap = new Map<string, Order | ItemsAmount>([
  ['Newest', Order.AGE],
  ['Alphabetically', Order.TITLE],
  ['Cheapest', Order.PRICE_ASC],
  ['4', ItemsAmount.FOUR],
  ['8', ItemsAmount.EIGHT],
  ['16', ItemsAmount.SIXTEEN],
  ['all', ItemsAmount.ALL],
]);

const apiToUIMap = new Map<string, string>([
  [Order.AGE, 'Newest'],
  [Order.TITLE, 'Alphabetically'],
  [Order.PRICE_ASC, 'Cheapest'],
  [ItemsAmount.FOUR, '4'],
  [ItemsAmount.EIGHT, '8'],
  [ItemsAmount.SIXTEEN, '16'],
  [ItemsAmount.ALL, 'all'],
]);

export { uiToApiMap, apiToUIMap };
