import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { Catalog } from '../components/Catalog';

import { Pagination } from '../components/Pagination';
import { Dropdown } from '../components/Dropdown';
import { NavigationField } from '../components/NavigationField';
import { toUpperCaseFirstLetter } from '../helpers/helpers';
import { RootState } from '../Reducers/store';
import { Products } from '../type/Products';
import { getProducts } from '../api/getData';
import { Loader } from '../components/Loader/Loader';

const FILTER_SORT = ['Age', 'Price', 'Name'];
const FILTER_QUANTITY = ['16', '8', '4'];

export const CatalogPage: React.FC = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') || '1';
  const { category } = useParams();

  const [liftedListLength, setLiftedListLength] = useState(0);

  const [sort, setSort] = useState('');
  const [quantity, setQuantity] = useState(16);
  const [query, setQuery] = useState('');

  const [searchParams] = useSearchParams();
  const [catalog, setCatalog] = useState<Products[]>([]);

  const favorites = useSelector((state: RootState) => state.favorites);

  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    setSort(searchParams.get('sort') || 'age');
    setQuantity(Number(searchParams.get('perPage') || '16'));
    setQuery(searchParams.get('query') || '');
  }, [page, searchParams]);

  const data = async () => {
    try {
      setFetchingData(true);

      const result = await getProducts();

      const getCatalog = result
        .filter((element) => element.category === category);

      setCatalog(getCatalog);

      setLiftedListLength(getCatalog.length);

      setFetchingData(false);
    } catch {
      swal({
        icon: 'error',
        title: 'Empty list, Data Error!',
        text: 'Try again in 5 minutes',
      });
    }
  };

  useEffect(() => {
    if (category === 'favorites') {
      setFetchingData(true);

      setCatalog(favorites);

      setLiftedListLength(favorites.length);

      setFetchingData(false);
    } else {
      data();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, favorites]);

  if (fetchingData) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container">
      <NavigationField />
      {liftedListLength !== 0 && (
        <>
          <div className="catalog__top">
            <h1
              className="catalog__title"
            >
              {toUpperCaseFirstLetter(`${category}`)}
            </h1>
            <span className="catalog__subtitle">
              {`${liftedListLength} models`}
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
        </>
      )}

      <Catalog
        catalog={catalog}
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
