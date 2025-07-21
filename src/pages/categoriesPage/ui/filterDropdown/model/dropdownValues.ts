import { ItemsAmount, Order } from '@shared/types/filterEnums';

const sortByOrder = [
  {
    id: 0,
    value: Order.Newest,
  },
  {
    id: 1,
    value: Order.Alphabet,
  },
  {
    id: 2,
    value: Order.Cheapest,
  },
];

const itemsAmount = [
  {
    id: 0,
    value: ItemsAmount.four,
  },
  {
    id: 1,
    value: ItemsAmount.eight,
  },
  {
    id: 2,
    value: ItemsAmount.sixteen,
  },
  {
    id: 3,
    value: ItemsAmount.all,
  },
];

export { sortByOrder, itemsAmount };
