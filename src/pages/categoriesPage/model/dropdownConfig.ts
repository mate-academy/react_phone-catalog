import { PerPage } from '@shared/api';

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
  defaultLabel: PerPage.ALL,
  names: [PerPage.ALL, PerPage.FOUR, PerPage.EIGHT, PerPage.SIXTEEN],
};

export { filter, pPage, type DropdownProps };
