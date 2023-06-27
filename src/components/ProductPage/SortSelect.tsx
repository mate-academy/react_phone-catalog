import { Select } from '../UI/Select/Select';

const sortOptions: { [key: string]: string } = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};

export const SortSelect = () => {
  return (
    <Select label="Sort by" width={176} options={sortOptions} name="sort" />
  );
};
