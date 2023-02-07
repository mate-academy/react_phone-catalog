import React, { useContext, useEffect, useState } from 'react';
import './ProductsCatalog.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Product } from '../../types/Product';
import { SearchParams } from '../../types/SearchParams';
import { Filters } from '../Filters/Filters';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';
import { Pagination } from '../Pagination/Pagination';
import { ProductList } from '../ProductsList/ProductsList';
import { Context } from '../../helpers/ContextProvider';

type Props = {
  title: string,
  breadcrumps: string,
  isLoading: boolean,
  products: Product[] | null,
  error: string | null,
  setError: (error: string | null) => void,
};

export const ProductsCatalog: React.FC<Props> = ({
  title,
  breadcrumps,
  isLoading,
  products,
  error,
  setError,
}) => {
  const [matchProductsQuantity, setMatchProductsQuantity] = useState(0);
  const [visibleProducts, setVisibleProducts]
    = useState<Product[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || '4';
  const { query, setQuery } = useContext(Context);
  const showPagination = perPage !== 'all' 
    && matchProductsQuantity > +perPage 
    && !error;

  const onSetSearchParams = (paramsToUpdate: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  const sortFunction = (a: Product, b :Product): number => {
    switch (sort) {
      case 'age':
        return b[sort] - a[sort];
      case 'name':
        return a[sort].localeCompare(b[sort]);
      case 'price':
        return a[sort] - b[sort];
      default:
        return 0;
    }
  };

  useEffect(() => {
    setError(null);

    if (products) {
      let processedProducts = [...products].sort(sortFunction);

      if (query !== '') {
        processedProducts = processedProducts.filter(product => {
          const name = product.name.toLowerCase();
          const search = query.toLowerCase();

          return name.includes(search);
        });

        if (processedProducts.length === 0) {
          setError('No products matching the search');
        }
      }

      setMatchProductsQuantity(processedProducts.length);

      if (perPage === 'all') {
        setVisibleProducts(processedProducts);

        return;
      }

      const lastVisibleProduct = currentPage * +perPage;
      const firstVisibleProduct = lastVisibleProduct - +perPage;

      const productsOnPage = processedProducts.slice(
        firstVisibleProduct,
        lastVisibleProduct,
      );

      setVisibleProducts(productsOnPage);
    }
  }, [products, currentPage, sort, perPage, query]);

  useEffect(() => {
    return () => {
      setQuery('');
    };
  }, []);

  return (
    <div className="container products-catalog">
      <div className="breadcrumps">
        <Link to="/" className="breadcrumps__item">
          <img src="./assets/home.svg" alt="home-icon" />
        </Link>
        <img
          src="./assets/arrow-next-grey.svg"
          className="breadcrumps__divider"
          alt="arrow-next"
        />
        <p className="text__small text__small--secondary breadcrumps__item">
          {breadcrumps}
        </p>
      </div>

      <section className="products-catalog__section">
        <h1 className="title title--h1 products-catalog__title">
          {title}
        </h1>
        {products && (
          <span className="products-catalog__quantity">
            {`${matchProductsQuantity || 0} models`}
          </span>
        )}
        {error && (
          <div className="products-catalog__notification">
            <Error text={error} />
          </div>
        )}
        {isLoading && <Loader />}
        {(visibleProducts && products && !error) && (
          <>
            <Filters
              sort={sort}
              perPage={perPage}
              onSetSearchParams={onSetSearchParams}
            />
            <ProductList
              products={visibleProducts}
            />
            {showPagination && (
              <div className="products-catalog__pagination">
                <Pagination
                  quantity={matchProductsQuantity}
                  perPage={+perPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
