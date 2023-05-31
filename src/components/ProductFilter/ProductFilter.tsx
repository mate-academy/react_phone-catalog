import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getSearchWith } from '../../helpers/searchHelper';
import { CustomSelect } from '../CustomSelect';

import './ProductFilter.scss';

const selectOptionsSort = [
  { value: 'age', text: 'Newest' },
  { value: 'name', text: 'Alphabetically' },
  { value: 'price', text: 'Cheapest' },
];

const selectOptionsItemsOnPage = [
  { value: '4', text: '4' },
  { value: '8', text: '8' },
  { value: '16', text: '16' },
  { value: 'all', text: 'All' },
];

export const ProductFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = useMemo(() => searchParams.get('sortBy'), [searchParams]);
  const perPage = useMemo(() => searchParams.get('perPage'), [searchParams]);

  return (
    <div className="product-filter">
      <div className="product-filter__container">
        <div className="product-filter__name">Sort by</div>

        <div className="product-filter__select">
          <CustomSelect
            options={selectOptionsSort}
            onChange={(option: string) => (
              setSearchParams(getSearchWith(searchParams, { sortBy: option }))
            )}
            buttonText={selectOptionsSort[0].text}
            value={
              selectOptionsSort.find((option) => option.value === sortBy)
                ?.text || ''
            }
            width={176}
          />
        </div>
      </div>

      <div className="product-filter__container">
        <div className="product-filter__name">Items on page</div>

        <div className="product-filter__select">
          <CustomSelect
            options={selectOptionsItemsOnPage}
            onChange={(option: string) => setSearchParams(
              getSearchWith(searchParams, { perPage: option, page: '1' }),
            )}
            buttonText="All"
            value={
              selectOptionsItemsOnPage.find(
                (option) => option.value === perPage,
              )?.text || ''
            }
            width={176}
          />
        </div>
      </div>
    </div>
  );
};
