import { ItemsAmount, Order } from '@shared/types/filterTypes';

enum Titles {
  ORDER = 'Sort by',
  ITEMS = 'Items on page',
}

type OrderProps = {
  title: Titles;
  current: Order;
  fn: (value: Order) => void;
  list: Order[];
};

type AmountProps = {
  title: Titles;
  current: ItemsAmount;
  fn: (value: ItemsAmount) => void;
  list: ItemsAmount[];
};

export { Titles, type OrderProps, type AmountProps };
