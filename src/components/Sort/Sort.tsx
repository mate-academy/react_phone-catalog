/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import './Sort.scss';
import { Product } from '../../types/productType';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  products: Product[],
};

export const Sort: React.FC<Props> = ({
  products,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 16;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        sort: event.target.value || null,
        page: '1',
      }),
    );
  };

  const handleItemsCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        perPage: event.target.value,
        page: '1',
      }),
    );
  };

  return (
    <div className="sort">
      <label className="sort__label">
        <p className="sort__description">Sort by:</p>

        <select
          value={sort || ''}
          onChange={handleSortChange}
          className="sort__value"
        >
          <option value="">Default</option>
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option className="sort__option" value="price">Cheapest</option>
        </select>
      </label>

      <label className="sort__label">
        <p className="sort__description">Items on page:</p>

        <select
          value={perPage}
          onChange={handleItemsCountChange}
          className="sort__value"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value={`${products.length}`}>All</option>
        </select>
      </label>
    </div>
  );
};
