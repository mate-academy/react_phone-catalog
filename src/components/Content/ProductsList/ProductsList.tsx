import {useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';

import {Products} from '../../../type/Productes';
import {Card} from '../Card';
import {Loader} from '../../Loader';
import {SortProduct} from '../../../type/type';
import {Pagination} from '../Pagination';
import {NoResults} from '../../NoResults';

import style from './ProductsList.module.scss';
import {Breadcrumb} from '../Breadcrumb';
import {
  filterAndSortProducts,
  paginateProducts,
} from '../../../utils/catalogPipeline';

type Props = {
  loader: boolean;
  title: string;
  product: Products[];
  path: string[];
  error?: string | null;
  onRetry?: () => void;
};

export const ProductsList: React.FC<Props> = ({
  loader,
  title,
  product,
  path,
  error,
  onRetry,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || SortProduct.None;
  const itemsOnPage = searchParams.get('itemsPage') || '16';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;
    updateParams({itemsPage: newValue, page: null});
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    updateParams({sort: newValue, page: null});
  };

  const filteredProducts = useMemo(
    () => filterAndSortProducts(product, query, sortBy),
    [product, query, sortBy],
  );

  const visibleProducts = useMemo(
    () => paginateProducts(filteredProducts, page, itemsOnPage),
    [filteredProducts, itemsOnPage, page],
  );

  const setPage = (nextPage: React.SetStateAction<number>) => {
    const value = typeof nextPage === 'function' ? nextPage(page) : nextPage;
    updateParams({page: value === 1 ? null : String(value)});
  };

  return (
    <div className={style.productPage}>
      {error ? (
        <div role="alert">
          <h1>Could not load products</h1>
          <p>{error}</p>
          {onRetry && (
            <button type="button" onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      ) : filteredProducts.length === 0 && !loader ? (
        <NoResults title={title} />
      ) : (
        <>
          {loader ? (
            <Loader />
          ) : (
            <div className={style.productPage__container}>
              <Breadcrumb path={path} />
              <h1 className={style.productPage__title}>{title}</h1>
              <span
                className={style.productPage__numPhone}
              >{`${filteredProducts.length} models`}</span>
              <div className={style.productPage__sort}>
                <div className={style.productPage__select}>
                  <span className={style.productPage__select_title}>
                    Sort by
                  </span>
                  <select
                    aria-label="Sort products"
                    className={style.select}
                    onChange={handleSortByChange}
                    value={sortBy}
                  >
                    <option className={style.select__option}>Default</option>
                    <option
                      className={style.select__option}
                      value={SortProduct.Age}
                    >
                      Newest
                    </option>
                    <option
                      className={style.select__option}
                      value={SortProduct.Name}
                    >
                      Alphabetically
                    </option>
                    <option
                      className={style.select__option}
                      value={SortProduct.Price}
                    >
                      Cheapest
                    </option>
                  </select>
                </div>
                <div className={style.productPage__select}>
                  <span className={style.productPage__select_title}>
                    Items on page
                  </span>
                  <select
                    aria-label="Items per page"
                    className={style.select}
                    data-cy="perPageSelector"
                    onChange={handleItemsPerPageChange}
                    value={itemsOnPage}
                  >
                    <option className={style.select__option} value="All">
                      All
                    </option>
                    <option className={style.select__option} value="16">
                      16
                    </option>
                    <option className={style.select__option} value="8">
                      8
                    </option>
                    <option className={style.select__option} value="4">
                      4
                    </option>
                  </select>
                </div>
              </div>
              <div className={style.productPage__cards}>
                {visibleProducts.map((phone: Products) => (
                  <div className={style.productPage__card} key={phone.id}>
                    <Card produkt={phone} />
                  </div>
                ))}
              </div>

              <Pagination
                total={filteredProducts.length}
                perPage={itemsOnPage}
                page={page}
                setPage={setPage}
                itemsOnPage={itemsOnPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
