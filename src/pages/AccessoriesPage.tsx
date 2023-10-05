import { Link, useSearchParams } from 'react-router-dom';
import {
  useEffect, useMemo, useState,
} from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import '../styles/blocks/Accessories.scss';
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
  handleSetFavorites: (value: Product) => void;
  favorites: Product[],
  query: string;
  handleSetQuery: (value:string) => void;
};

export const AccessoriesPage: React.FC<Props> = ({
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
  const accessories = useMemo(() => {
    return products.filter(product => product.type === Type.accessory);
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
    const copyOfAccessories = [...accessories];
    const copyOfAccessoriesLength = copyOfAccessories.filter(accessory => {
      const nameToLower = accessory.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    }).length;

    const numberOfPages
    = (pagesOnSite !== 'all' && copyOfAccessoriesLength !== 0)
      ? Math.ceil(copyOfAccessoriesLength / +pagesOnSite) : 1;

    const arrayOfPages = [];

    for (let i = 0; i < numberOfPages; i += 1) {
      arrayOfPages.push(i + 1);
    }

    return arrayOfPages;
  }, [pagesOnSite, isLoading, query]);

  const sortedAccessories = useMemo(() => {
    updatePageHeight();
    const copyOfAccessories = [...accessories];
    let filtredAccessories = copyOfAccessories.filter(accessory => {
      const nameToLower = accessory.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    });

    switch (sortBy) {
      case SortBy.age:
        filtredAccessories
        = [...filtredAccessories].sort((a, b) => a.age - b.age);
        break;
      case SortBy.name:
        filtredAccessories
        = [...filtredAccessories].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.price:
        filtredAccessories
        = [...filtredAccessories].sort((a, b) => a.price - b.price);
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
      ? origin + +pagesOnSite : filtredAccessories.length;

    return filtredAccessories.slice(origin, end);
  }, [sortBy, pagesOnSite, accessories, paginationNumber, updatePageHeight]);

  return (
    <div className="accessories-page-container">
      { isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="icon-navigation
          accessories-page-container__icon-navigation"
          >
            <Link to="/">
              <img src="./img/icons/home.svg" alt="#logo" />
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <span className="icon-navigation-text">Accessories</span>
          </div>

          {accessories.length === 0 ? (
            <NotFound category="Accessories" />
          ) : (
            <>
              <h1 className="title accessories-page-container__title">
                Accessories
              </h1>
              {sortedAccessories.length === 0 ? (
                <NoSearchResult />
              ) : (
                <>
                  <p className="models-number
              accessories-page-container__model-numbers"
                  >
                    {sortedAccessories.length === 1
                      ? `${sortedAccessories.length} model`
                      : `${sortedAccessories.length} models`}
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
                accessories-page-container__products-list"
                    data-cy="productList"
                  >
                    {sortedAccessories
                      .map(accessory => (
                        <ProductCard
                          product={accessory}
                          moveLeft={0}
                          key={accessory.id}
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
