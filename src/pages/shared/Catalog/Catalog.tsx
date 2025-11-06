import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown/Dropdown';
import { ProductList } from '../ProductList/ProductList';
import { ProductFull } from '../../../types/Product_full';
import { useContext, useRef } from 'react';
import { ErrorContext } from '../../../store/ErrorContext';
import { Loader } from '../../../components/Loader';
import { Pagination } from '../Pagination/Pagination';
import { getSortedProducts } from '../../../helpers/getSortedProducts';
import styles from './Catalog.module.scss';

type Props = {
  title: string;
  products: ProductFull[];
  noDropdowns?: boolean;
};

const ITEMS_PER_PAGE = [
  ['4', '4'],
  ['8', '8'],
  ['16', '16'],
  ['All', 'all'],
];
const SORT_FIELDS = [
  ['Newest', 'age'],
  ['Alphabetically', 'name'],
  ['Cheapest', 'price'],
];

export const Catalog: React.FC<Props> = ({ title, products, noDropdowns }) => {
  const { isLoading, errorMessage } = useContext(ErrorContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 8;
  const page = searchParams.get('page') || '1';
  const itemsPerPage = perPage === 'all' ? products.length : +perPage;
  const start = (+page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const sortedProducts = getSortedProducts(products, sort);
  const visibleProducts = sortedProducts.slice(start, end);

  const handleSortFieldSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);
  };

  const handleItemsPerPageSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value);
    setSearchParams(params);
  };

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.catalog}>
      <h1 className={styles.catalog__title} ref={listRef}>
        {title}
      </h1>
      <p className={styles.catalog__count}>{products.length} model(s)</p>
      {isLoading && <Loader />}
      {!isLoading && errorMessage && (
        <div className="error">
          <p className="errorMessage">{errorMessage}</p>
          <button
            className="errorButton"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}
      {!errorMessage && !isLoading && products.length === 0 && (
        <p className="errorMessage">No products found</p>
      )}
      {!errorMessage && !isLoading && products.length > 0 && (
        <>
          {noDropdowns || (
            <div className={styles.catalog__dropdowns}>
              <div className={styles.catalog__dropdownBig}>
                <Dropdown
                  title="Sort by"
                  options={SORT_FIELDS}
                  defaultOption="Alphabetically"
                  selectHandle={handleSortFieldSelect}
                />
              </div>
              <div className={styles.catalog__dropdownSmall}>
                <Dropdown
                  title="Items per page"
                  options={ITEMS_PER_PAGE}
                  defaultOption="8"
                  selectHandle={handleItemsPerPageSelect}
                />
              </div>
            </div>
          )}
          <section className={styles.catalog__list}>
            <ProductList products={visibleProducts} />
          </section>
          {title === 'Favourites' || (
            <div className={styles.catalog__pagination}>
              <Pagination
                quantity={products.length}
                itemsPerPage={+perPage}
                page={page}
                listRef={listRef}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
