import { Link, useSearchParams } from 'react-router-dom';
import {
  useEffect, useMemo, useState,
} from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import '../styles/blocks/PhonesPage.scss';
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
  query: string;
  handleSetQuery: (value:string) => void;
};

export const PhonesPage: React.FC<Props> = ({
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
  const phones = useMemo(() => {
    return products.filter(product => product.type === Type.phone);
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
    const copyOfPhones = [...phones];
    const copyOfPhonesLength = copyOfPhones.filter(phone => {
      const nameToLower = phone.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    }).length;

    const numberOfPages = (pagesOnSite !== 'all' && copyOfPhonesLength !== 0)
      ? Math.ceil(copyOfPhonesLength / +pagesOnSite) : 1;

    const arrayOfPages = [];

    for (let i = 0; i < numberOfPages; i += 1) {
      arrayOfPages.push(i + 1);
    }

    return arrayOfPages;
  }, [pagesOnSite, isLoading, query]);

  const sortedPhones = useMemo(() => {
    updatePageHeight();
    const copyOfPhones = [...phones];
    let filtredPhones = copyOfPhones.filter(phone => {
      const nameToLower = phone.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    });

    switch (sortBy) {
      case SortBy.age:
        filtredPhones = [...filtredPhones].sort((a, b) => a.age - b.age);
        break;
      case SortBy.name:
        filtredPhones
        = [...filtredPhones].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.price:
        filtredPhones = [...filtredPhones].sort((a, b) => a.price - b.price);
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
      ? origin + +pagesOnSite : filtredPhones.length;

    return filtredPhones.slice(origin, end);
  }, [sortBy, pagesOnSite, phones, paginationNumber, query, updatePageHeight]);

  return (
    <div className="phones-page-container">
      { isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="icon-navigation
          phones-page-container__icon-navigation"
          >
            <Link to="/">
              <img src="./img/icons/home.svg" alt="#logo" />
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <span className="icon-navigation-text">Phones</span>
          </div>
          {phones.length === 0 ? (
            <NotFound category="Mobile phones" />
          ) : (
            <>
              <h1 className="title phones-page-container__title">
                Mobile phones
              </h1>

              {sortedPhones.length === 0 ? (
                <NoSearchResult />
              ) : (
                <>
                  <p className="models-number
                  phones-page-container__model-numbers"
                  >
                    {sortedPhones.length === 1
                      ? `${sortedPhones.length} model`
                      : `${sortedPhones.length} models`}
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
                    phones-page-container__products-list"
                    data-cy="productList"
                  >
                    {sortedPhones.map(phone => (
                      <ProductCard
                        product={phone}
                        moveLeft={0}
                        key={phone.id}
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
