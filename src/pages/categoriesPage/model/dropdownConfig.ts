import { ItemsAmount } from '@shared/api';

interface DropdownProps {
  title: string;
  defaultLabel: string;
  names: string[];
}

const filter: DropdownProps = {
  title: 'Sort by',
  defaultLabel: 'Newest',
  names: ['Newest', 'Alphabetically', 'Cheapest'],
};

const pPage: DropdownProps = {
  title: 'Items on page',
  defaultLabel: ItemsAmount.ALL,
  names: [
    ItemsAmount.ALL,
    ItemsAmount.FOUR,
    ItemsAmount.EIGHT,
    ItemsAmount.SIXTEEN,
  ],
};

export { filter, pPage, type DropdownProps };
