import { ItemsAmount, Order } from '@shared/api';

type OrderMap = Record<string, Order>;
type AmountMap = Record<string, ItemsAmount>;

const argToValidSort: OrderMap = {
  age: Order.AGE,
  title: Order.TITLE,
  price: Order.PRICE_ASC,
};

const argToValidAmount: AmountMap = {
  '4': ItemsAmount.FOUR,
  '8': ItemsAmount.EIGHT,
  '16': ItemsAmount.SIXTEEN,
};

export { argToValidSort, argToValidAmount };
