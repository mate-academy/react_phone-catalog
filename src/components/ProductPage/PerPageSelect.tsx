import { Select } from '../Select/Select';

const perPageOptions: { [key: string]: string } = {
  all: 'all',
  4: '4',
  8: '8',
  16: '16',
};

export const PerPageSelect = () => (
  <Select
    label="Items on page"
    width={128}
    name="perPage"
    options={perPageOptions}
  />
);
