import {
  useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Catalog } from '../components/Catalog';

import { Pagination } from '../components/Pagination';
import { Dropdown } from '../components/Dropdown';
import { NavigationField } from '../components/NavigationField';
import { toUpperCaseFirstLetter } from '../utils/helpers';

const FILTER_SORT = ['age', 'price', 'name'];
const FILTER_QUANTITY = ['16', '8', '4'];

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || '1';

  const [liftedListLength, setLiftedListLength] = useState(0);

  const [sort, setSort] = useState('');
  const [quantity, setQuantity] = useState(16);
  const [query, setQuery] = useState('');

  const { category } = useParams();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSort(searchParams.get('sort') || 'age');
    setQuantity(Number(searchParams.get('perPage') || '16'));
    setQuery(searchParams.get('query') || '');
  }, [page, searchParams]);

  const onGetListLength = (number: number) => {
    setLiftedListLength(number);
  };

  return (
    <div className="container">
      <NavigationField />
      <div className="catalog__top">
        <h1
          className="catalog__title"
        >
          {toUpperCaseFirstLetter(category || '')}
        </h1>
        <span className="catalog__subtitle">
          {liftedListLength}
          {' '}
          models
        </span>
      </div>
      <div className="filter">
        <Dropdown
          list={FILTER_SORT}
          type="sort"
          title="Sort by"
        />

        <Dropdown
          list={FILTER_QUANTITY}
          type="perPage"
          title="Items on page"
        />
      </div>

      <Catalog
        onGetListLength={onGetListLength}
        sort={sort}
        quantity={quantity}
        query={query}
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
