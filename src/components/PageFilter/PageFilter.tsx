import { Dropdown } from '../Dropdown';

import './PageFilter.scss';

const sortOptions = [
  { value: 'Newest', id: 0, type: 'sort' },
  { value: 'Alphabetically', id: 1, type: 'sort' },
  { value: 'Cheapest', id: 2, type: 'sort' },
];

const options = [
  { value: '4', id: 0, type: 'itemsPerPage' },
  { value: '8', id: 1, type: 'itemsPerPage' },
  { value: '16', id: 2, type: 'itemsPerPage' },
  { value: 'All', id: 3, type: 'itemsPerPage' },
];

export const PageFilter: React.FC = () => {
  return (
    <div className="page-filter">
      <div className="page-filter--left">
        <p className="small-text-gray page-filter__title">Sort by</p>

        <Dropdown options={sortOptions} />
      </div>

      <div className="phones-page__filter--right">
        <p className="small-text-gray page-filter__title">Items on page</p>

        <Dropdown options={options} startOption="All" />
      </div>
    </div>
  );
};
