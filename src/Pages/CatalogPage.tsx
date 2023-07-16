import {
  useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Catalog } from '../components/Catalog/Catalog';

import { Pagination } from '../components/Pagination/Pagination';
import { Dropdown } from '../components/Dropdown/Dropdown';

const FILTER_SORT = ['age', 'price', 'name'];
const FILTER_QUANTITY = ['16', '8', '4'];

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || '1';

  const { category } = useParams();

  const [liftedListLength, setLiftedListLength] = useState(0);

  const [sort, setSort] = useState('');
  const [quantity, setQuantity] = useState(16);

  const [searchParams] = useSearchParams();

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

  const onGetListLength = (number: number) => {
    setLiftedListLength(number);
  };

  return (
    <div className="container">
      <div className="filter">
        <Dropdown list={FILTER_SORT} type="sort" />
        <Dropdown list={FILTER_QUANTITY} type="perPage" />
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
