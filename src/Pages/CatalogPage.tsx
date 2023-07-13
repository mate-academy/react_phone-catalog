import {
  useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { Catalog } from '../components/Catalog/Catalog';

import { Pagination } from '../components/Pagination/Pagination';

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || '1';

  const { category } = useParams();

  const [liftedListLength, setLiftedListLength] = useState(0);

  const [sort, setSort] = useState('');
  const [quantity, setQuantity] = useState(16);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSort(searchParams.get('sort') || 'age');
    setQuantity(Number(searchParams.get('perPage') || '16'));
  }, [page, searchParams]);

  if (!category) {
    return (
      <div>
        WHOOPS
      </div>
    );
  }

  const onSortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearchParams({
      sort: `${value}`,
    });
  };

  const onQuantityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearchParams({
      perPage: `${value}`,
    });
  };

  const onGetListLength = (number: number) => {
    setLiftedListLength(number);
  };

  return (
    <div className="container">
      <div className="filter">
        <select
          className="filter__select"
          value={sort}
          onChange={onSortHandler}
        >
          <option value="age">
            Age
          </option>
          <option value="name">
            Name
          </option>
          <option value="price">
            Price
          </option>
        </select>

        <select
          className="filter__select"
          value={quantity}
          onChange={onQuantityHandler}
        >
          <option value="16">16</option>
          <option value="8">8</option>
          <option value="4">4</option>
        </select>
      </div>

      <Catalog
        category={category || ''}
        onGetListLength={onGetListLength}
        sort={sort}
        quantity={quantity}
        currPage={Number(page)}
      />

      <Pagination
        total={liftedListLength}
        perPage={quantity}
        currPage={Number(page) || 1}
      />
    </div>
  );
};
