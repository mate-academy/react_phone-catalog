import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../api/hooks';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Selector } from '../../components/Selector';
import { productsFiltering } from '../../helpers/productsFiltering';
import { getProducts } from '../../features/productsSlice';
import { ProductList } from '../../components/ProductList';
import Pagination from '../../components/Pagination/Pagination';

import './Catalog.scss';
import { Loader } from '../../components/Loader';

interface CatalogProps {
  category: string;
  title: string;
}

export const Catalog: React.FC<CatalogProps> = ({
  category,
  title,
}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const isLoaded = useAppSelector(state => state.products.loaded);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = searchParams.get('currentPage') || '1';
  const query = searchParams.get('query') || '';

  const setParams = (name: string, value: string) => {
    const newParams = {
      ...Object.fromEntries(searchParams),
      [name]: value,
    };

    if (name === 'sortBy' || name === 'perPage') {
      newParams.currentPage = '1';
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    setParams('currentPage', `${page}`);
  };

  const categoryTotal = useMemo(() => {
    return productsFiltering.getCategoryTotal(products, category);
  }, [products, category]);

  const quantityName = useMemo(() => {
    if (query) {
      return 'results';
    }

    return 'models';
  }, [query]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productListToShow = useMemo(() => {
    let newList = productsFiltering.getCategoryProduct(products, category);

    if (query) {
      newList = productsFiltering.filterQuery(newList, query);
    }

    if (sortBy) {
      newList = productsFiltering.sortBy(newList, sortBy);
    }

    return newList;
  }, [products, category, query, sortBy]);

  const totalPages = perPage === 'all'
    ? 1
    : Math.ceil(productListToShow.length / +perPage);

  return (
    <>
      {isLoaded ? (
        <>
          <Breadcrumbs items={{
            [`${category}`]: `/${category}`,
          }}
          />
          {isLoaded && categoryTotal === 0 ? (
            <div className="catalog catalog__anything">
              <span className="catalog__anything__title">Oops!</span>
              <p className="catalog__anything__details">
                Currently out of stock in this category. Check back later!
              </p>
            </div>
          ) : (
            <div className="catalog">

              <section className="catalog__wrapper">
                <div className="catalog__head">
                  <h2 className="catalog__title">{title}</h2>
                  <span className="catalog__models-quantity">{`${productListToShow.length} ${quantityName}`}</span>
                </div>

                {!query && (
                  <section className="catalog__organazing">
                    <Selector
                      searchParamName="sortBy"
                      title="Sort by"
                      options={{
                        age: 'Newest',
                        name: 'Alphabetically',
                        price: 'Cheapest',
                      }}
                      defaultOptionKey={sortBy}
                      setParams={(key: string, value: string) => {
                        setParams(key, value);
                      }}
                    />

                    <Selector
                      searchParamName="perPage"
                      title="Items on page"
                      options={{
                        4: '4',
                        8: '8',
                        16: '16',
                        all: 'All',
                      }}
                      defaultOptionKey={perPage}
                      setParams={(key: string, value: string) => {
                        setParams(key, value);
                      }}
                    />
                  </section>
                )}

              </section>

              {query && productListToShow.length === 0 ? (
                <p className="catalog__nothing-found">
                  Nothing was found!
                </p>
              ) : (
                <>
                  <div className="catalog__wrapper">
                    <ProductList
                      products={productListToShow}
                      currentPage={+currentPage}
                      perPage={
                        perPage === 'all'
                          ? productListToShow.length
                          : +perPage
                      }
                    />
                  </div>
                </>
              )}

              {productListToShow.length !== 0 && (
                <Pagination
                  currentPage={+currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
