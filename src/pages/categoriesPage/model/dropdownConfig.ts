import { SearchParam } from './URLEnums';

interface DropdownProps {
  title: string;
  values: {
    name: string;
    searchParam: SearchParam;
  }[];
}

const filter: DropdownProps = {
  title: 'Sort by',
  values: [
    {
      name: 'Newest',
      searchParam: SearchParam.AGE,
    },
    {
      name: 'Alphabetically',
      searchParam: SearchParam.TITLE,
    },
    {
      name: 'Cheapest',
      searchParam: SearchParam.PRICE,
    },
  ],
};

const perPage: DropdownProps = {
  title: 'Items on page',
  values: [
    {
      name: '4',
      searchParam: SearchParam.FOUR,
    },
    {
      name: '8',
      searchParam: SearchParam.EIGHT,
    },
    {
      name: '16',
      searchParam: SearchParam.SIXTEEN,
    },
    {
      name: 'all',
      searchParam: SearchParam.ALL,
    },
  ],
};

export { filter, perPage, type DropdownProps };
