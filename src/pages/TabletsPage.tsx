import { Link, useSearchParams } from 'react-router-dom';
import {
  useEffect, useMemo, useState,
} from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import '../styles/blocks/TabletsPage.scss';
import {
  Product, SortBy, Pagination, Type,
} from '../types';
import { Loader } from '../components/Loader/Loader';
import { Filters } from '../components/Filters/Filters';
import { PaginationComponent } from '../components/Pagination/Pagination';
import { NotFound } from '../components/NotFound/NotFound';
import { Cart } from '../types/cart';
import { NoSearchResult } from '../components/NoSearchResult/NoSearchResult';

type Props = {
  products:Product[];
  updatePageHeight: () => void;
  isLoading: boolean;
  handleSetCarts: (value:Product) => void;
  carts:Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[];
  query:string,
  handleSetQuery: (value:string) => void;
};

export const TabletsPage: React.FC<Props> = ({
  products,
  updatePageHeight,
  isLoading,
  handleSetCarts,
  carts,
  handleSetFavorites,
  favorites,
  query,
  handleSetQuery,
}) => {
  const [searchParams] = useSearchParams(
    (window.location.hash).substring(window.location.hash.indexOf('?')),
  );
  const [sortBy, setSortBy] = useState<string>(
    SortBy.age,
  );
  const [pagesOnSite, setPagesOnSite] = useState<string>(
    searchParams.get('perPage') ?? Pagination.all,
  );
  const [paginationNumber, setPaginationNumber] = useState(
    Number(searchParams.get('page')) ?? 1,
  );
  const tablets = useMemo(() => {
    return products.filter(product => product.type === Type.tablet);
  }, [products]);

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const handlePaginationNumber = (value: number) => {
    setPaginationNumber(value);
  };

  const handlePagesOnSite = (value: string) => {
    setPagesOnSite(value);
  };

  useEffect(() => {
    handleSetQuery('');
    const sortByParams = searchParams.get('sort');

    switch (sortByParams) {
      case 'age':
        setSortBy(SortBy.age);
        break;
      case 'name':
        setSortBy(SortBy.name);
        break;
      case 'price':
        setSortBy(SortBy.price);
        break;
      default:
    }
  }, []);

  const numberOfPagination = useMemo(() => {
    const copyOfTablets = [...tablets];
    const copyOfTabletsLength = copyOfTablets.filter(tablet => {
      const nameToLower = tablet.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    }).length;

    const numberOfPages = (pagesOnSite !== 'all' && copyOfTabletsLength !== 0)
      ? Math.ceil(copyOfTabletsLength / +pagesOnSite) : 1;

    const arrayOfPages = [];

    for (let i = 0; i < numberOfPages; i += 1) {
      arrayOfPages.push(i + 1);
    }

    return arrayOfPages;
  }, [pagesOnSite, isLoading, query]);

  const sortedTablets = useMemo(() => {
    updatePageHeight();
    const copyOfTablets = [...tablets];
    let filtredTablets = copyOfTablets.filter(tablet => {
      const nameToLower = tablet.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    });

    switch (sortBy) {
      case SortBy.age:
        filtredTablets = [...filtredTablets].sort((a, b) => a.age - b.age);
        break;
      case SortBy.name:
        filtredTablets
        = [...filtredTablets].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.price:
        filtredTablets = [...filtredTablets].sort((a, b) => a.price - b.price);
        break;
      default:
    }

    if (paginationNumber < 1) {
      setPaginationNumber(1);
    } else if (paginationNumber > numberOfPagination.length
      && numberOfPagination.length > 1) {
      setPaginationNumber(numberOfPagination.length);
    }

    const origin = pagesOnSite !== 'all'
      ? (paginationNumber - 1) * +pagesOnSite : 0;
    const end = pagesOnSite !== 'all'
      ? origin + +pagesOnSite : filtredTablets.length;

    return filtredTablets.slice(origin, end);
  }, [sortBy, pagesOnSite, tablets, paginationNumber, query, updatePageHeight]);

  return (
    <div className="tablets-page-container">
      { isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="icon-navigation
          tablets-page-container__icon-navigation"
          >
            <Link to="/">
              <img src="./img/icons/home.svg" alt="#logo" />
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <span className="icon-navigation-text">Tablets</span>
          </div>

          {tablets.length === 0 ? (
            <NotFound category="Tablets" />
          ) : (
            <>
              <h1 className="title tablets-page-container__title">Tablets</h1>

              {sortedTablets.length === 0 ? (
                <NoSearchResult />
              ) : (
                <>
                  <p className="models-number
              tablets-page-container__model-numbers"
                  >
                    {sortedTablets.length === 1
                      ? `${sortedTablets.length} model`
                      : `${sortedTablets.length} model`}
                  </p>
                  <Filters
                    sortBy={sortBy}
                    updatePageHeight={updatePageHeight}
                    pagesOnSite={pagesOnSite}
                    setSortBy={handleSortBy}
                    setPaginationNumber={handlePaginationNumber}
                    setPagesOnSite={handlePagesOnSite}
                  />

                  <div
                    className="products-list
                    tablets-page-container__products-list"
                    data-cy="productList"
                  >
                    {sortedTablets.map(tablet => (
                      <ProductCard
                        product={tablet}
                        moveLeft={0}
                        key={tablet.id}
                        handleSetCarts={handleSetCarts}
                        carts={carts}
                        handleSetFavorites={handleSetFavorites}
                        favorites={favorites}
                      />
                    ))}
                  </div>
                  {numberOfPagination.length > 1 && (
                    <PaginationComponent
                      paginationNumber={paginationNumber}
                      setPaginationNumber={handlePaginationNumber}
                      numberOfPagination={numberOfPagination}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
