import './PageContent.scss';
import React, { useContext, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { GlobalContext } from '../../store';
import { sortBy } from '../../types/SortBy';
import { Params } from '../../types/Params';
import { Product } from '../../types/Product';
import { itemsCount } from '../../types/ItemsCount';
import { getSearchWith } from '../../helpers/searchHelper';
import { getSortedProducts } from '../../helpers/getSortedProducts';

import { Dropdown } from '../Dropdown';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductList } from '../ProductList';
import { NoSearchResults } from '../NoSearchResults';
import { SortTypes } from '../../types/SortTypes';
import { SearchParams } from '../../types/SearchParams';

type Props = {
  title: string,
  itemsList: Product[],
};

export const PageContent: React.FC<Props> = ({ title, itemsList }) => {
  const { isLoading } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get(SearchParams.Page) || '1';
  const sortType = searchParams.get(SearchParams.Sort) || SortTypes.AGE;
  const perPage = searchParams.get(SearchParams.PerPage) || itemsCount[16];

  const sortedProducts = getSortedProducts(itemsList, searchParams);

  const itemsPerPage = useMemo(() => {
    return sortedProducts.filter((item, index) => {
      if (perPage !== 'All') {
        return index < +currentPage * +perPage
        && index >= +currentPage * +perPage - +perPage;
      }

      return item;
    });
  }, [currentPage, perPage, sortedProducts]);

  const buttonsList = [];
  const buttonsMax = perPage !== 'All'
    ? Math.ceil(sortedProducts.length / +perPage)
    : 1;

  for (let i = 1; i <= buttonsMax; i += 1) {
    buttonsList.push(i);
  }

  const showPaginationBtns
    = !isLoading && sortedProducts.length > +perPage && buttonsMax > 1;

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const selectSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (perPage !== 'All') {
      setSearchWith({ sort: e.target.value, page: '1' });
    } else {
      setSearchWith({ sort: e.target.value });
    }
  };

  const selectItemsOnPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'All') {
      setSearchWith({ page: null, perPage: e.target.value });
    } else {
      setSearchWith({ page: '1', perPage: e.target.value });
    }
  };

  const setCurrentPage = (button: number) => {
    setSearchWith({ page: button.toString() });
  };

  return (
    <section className="page-content">
      <Breadcrumbs />

      <h1 className="page-content__title">{title}</h1>

      <p className="page-content__amount">
        {`${sortedProducts.length} models`}
      </p>

      {itemsList.length === 0 && !isLoading && (
        <div className="empty-message">
          This section is empty
        </div>
      )}

      {itemsList.length !== 0
        && sortedProducts.length !== 0
        && pathname !== '/favourites' && (
        <div className="page-content__selects">
          <Dropdown
            label="Sort by"
            value={sortType}
            options={sortBy}
            handleChange={selectSortBy}
          />
          <Dropdown
            label="Items on page"
            value={perPage}
            options={itemsCount}
            handleChange={selectItemsOnPage}
          />
        </div>
      )}

      {isLoading && <Loader />}
      {!isLoading && sortedProducts.length !== 0
        ? (
          <ProductList
            itemsList={itemsPerPage}
          />
        )
        : (itemsList.length !== 0 && <NoSearchResults />)}

      {showPaginationBtns && (
        <Pagination
          buttonsList={buttonsList}
          currentPage={+currentPage}
          buttonsMax={buttonsMax}
          onPageChange={(button) => setCurrentPage(button)}
        />
      )}
    </section>
  );
};
