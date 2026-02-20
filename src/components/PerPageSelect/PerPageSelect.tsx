import { SelectControl } from '../SelectControl';

const options = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const PerPageSelect = () => (
  <SelectControl
    label="Items on page"
    name="perPage"
    options={options}
    defaultValue="all"
  />
);
