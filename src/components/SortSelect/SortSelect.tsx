import { SelectControl } from '../SelectControl';

const options = [
  { value: 'year', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const SortSelect = () => (
  <SelectControl
    label="Sort by"
    name="sort"
    options={options}
    defaultValue="year"
  />
);
