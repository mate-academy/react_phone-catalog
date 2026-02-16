import { useEffect, useMemo, useState } from 'react';
import { getApi } from '../../../shared/api/api';
import { ProductPage } from '../../../shared/types/ProductPage';
import { CardList } from '../../../shared/components/CardList';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LoaderCards } from '../../../shared/components/LoaderCards';
import dataPerPage from './api/handleChangeValues.json';
import dataSortValue from './api/selectSortValue.json';
import classNames from 'classnames';
import '../globals.scss';

import {
  getTotalPages,
  onNavignationLinks,
  handleChangeItems,
  PrevOrNextItems,
  paginationDigitLink,
  urlParamsFunctionUpdate,
} from '../utils/pagination';
import { ActionBtn } from '../components/ActionBtn';
import { sortItems } from '../utils/sort';

export const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageUrl = searchParams.get('page');
  const itemsPePageUrl = searchParams.get('perPage');
  const query = searchParams.get('query');
  const currentPageUrlHas = searchParams.has('page');
  const itemsPePageUrlHas = searchParams.has('perPage');
  const sort = searchParams.get('sort') || 'Newest';

  // const itemsPePageUrlHas = searchParams.has('perPage');
  const [phonesItems, setPhonesItems] = useState<ProductPage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<number | string>('Newest');
  const [sortLabel, setSortLabel] = useState<string>('Newest');
  const [currentPage, setCurrentPage] = useState<number>(
    (Number(currentPageUrl) === null || Number(currentPageUrl)) === 0
      ? 1
      : Number(currentPageUrl),
  );
  const [itemsPerPage, setItemsParPage] = useState<number | string>(
    Number(itemsPePageUrl) || 'all',
  );
  const [startItem, setStartItem] = useState<number>(0);
  const [endItem, setEndItem] = useState<number>(16);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  const currentPath = location.pathname;

  let itemCategory: string = '';

  /* load all products */
  if (currentPath === '/phones') {
    itemCategory = 'phones';
  }

  if (currentPath === '/accessories') {
    itemCategory = 'accessories';
  }

  if (currentPath === '/tablets') {
    itemCategory = 'tablets';
  }

  useEffect(() => {
    getApi<ProductPage[]>('/products.json')
      .then(products => {
        setPhonesItems(products);
      })
      .catch(errorMsg => {
        setError('Something went worng');
        throw new errorMsg();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  /* end of load all products */

  /* filter all phone's articles  */
  const phonesItemsList = phonesItems.filter(
    item => item.category === `${itemCategory}`,
  );
  /* end of  filter all phone's articles  */
  let filteredItemsList: ProductPage[];

  if (query) {
    filteredItemsList = phonesItemsList.filter(item =>
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  } else {
    filteredItemsList = phonesItemsList;
  }
  // let filteredItemsList = phonesItems.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))

  /* START OF PAGINATION */

  /* calculate of total pages for pagination  */
  const totalPages = useMemo(
    () =>
      getTotalPages({ items: filteredItemsList, cardsPerPage: itemsPerPage }),
    [filteredItemsList.length, itemsPerPage],
  );
  const countLInk: number[] = totalPages;
  /* end of calculate of total pages for pagination  */

  /* useEffect for all cchange parametres in real time */
  useEffect(() => {
    onNavignationLinks({
      hasUrl: currentPageUrlHas,
      hasItemsUrl: itemsPePageUrlHas,
      onStartItem: setStartItem,
      onEndItem: setEndItem,
      actuallyPage: currentPage,
      perPage: itemsPerPage,
      urlParams: searchParams,
      onUrlParams: setSearchParams,
      items: filteredItemsList,
      urlParamsFunction: urlParamsFunctionUpdate,
    });
    setSortLabel('Newest');
    if (sort) {
      if (sort === 'price') {
        setSortLabel('Cheapest');
      }

      if (sort === 'title') {
        setSortLabel('Alphabetically');
      }

      if (sort === 'price') {
        setSortLabel('Newest');
      }
    }

    sortItems({
      items: filteredItemsList,
      sortField: sort,
    });
    if (!searchParams.has('perPage') && filteredItemsList.length > 0) {
      setItemsParPage(filteredItemsList.length);
    }
  }, [
    currentPage,
    startItem,
    endItem,
    itemsPerPage,
    filteredItemsList.length,
    totalPages.length,
    searchParams,
    setSearchParams,
  ]);
  /* end of useEffect for all cchange parametres in real time */
  sortItems({
    items: filteredItemsList,
    sortField: sort,
  });

  /** calculate of last Page form array**/
  /** reset filtres when page while page changing **/
  const lastPage = countLInk[countLInk.length - 1];
  /** end of calculate of last Page form array* */

  /** calculation of pagination links slice**/
  const startDigit = Math.floor((currentPage - 1) / 4) * 4;
  const endDigit = startDigit + 4;
  /** end of calculation of pagination links slice**/

  /** Calculationg for select Change**/
  const selectValue =
    itemsPerPage === filteredItemsList.length ? 'all' : itemsPerPage;

  /* action btns values */
  const handleChangeValues = dataPerPage;
  const selectSortValue = dataSortValue;
  /* end of action btns values */

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeItems({
      event: e,
      onPerPage: setItemsParPage,
      onCurrentPage: setCurrentPage,
      items: filteredItemsList,
      actuallyPage: currentPage,
      urlParamsString: searchParams,
      onUrlParamsString: setSearchParams,
    });
  };
  /** End of calculationg for select Change**/
  /* END OF PAGINATION */

  return (
    <section className="items">
      <div className="wrapper">
        <div className="grid">
          <div className="breadcrumbs">
            <Link to={'/'}>
              <img src="img/shared/Home.svg" alt="" />
              <img
                src="img/shared/next-breadcrumbs.svg"
                alt=""
                className="next-breadcrumbs"
              />
            </Link>
            <Link to={`/${itemCategory}`}>
              {itemCategory}
              <img
                src="img/shared/next-breadcrumbs.svg"
                alt=""
                className="next-breadcrumbs"
              />
            </Link>
          </div>
          <h1 className="products-title">
            {itemCategory}
            <span className="items-length">
              {filteredItemsList.length} models{' '}
            </span>
          </h1>
          <div className="actions-btns-wrapper">
            <div className="sort-by">
              <ActionBtn
                itemsValue={selectSortValue}
                label={'Sort by'}
                value={sortValue}
                onSortValue={setSortValue}
                isSort={isOpenSort}
                onSort={setIsOpenSort}
                open={isOpen}
                onOpen={setIsOpen}
                urlStr={searchParams}
                onUrlStr={setSearchParams}
                btnLabel={sortLabel}
                onBtnLabel={setSortLabel}
              />
            </div>
            <div className="product-sort-by">
              <ActionBtn
                itemsValue={handleChangeValues}
                label={'Items on page'}
                value={selectValue}
                onSortValue={item => {
                  handleSelectChange({
                    target: { value: item },
                  } as React.ChangeEvent<HTMLSelectElement>);
                }}
                isSort={isOpen}
                onSort={setIsOpen}
                open={isOpenSort}
                onOpen={setIsOpenSort}
              />
            </div>
          </div>

          {loading && (
            <section className="loader">
              <LoaderCards />
            </section>
          )}
          {!loading && filteredItemsList.length > 0 ? (
            <CardList
              productsList={filteredItemsList.slice(startItem, endItem)}
              isFullPrice={true}
            />
          ) : !loading && phonesItemsList.length === 0 ? (
            <p className="error">There are no {itemCategory}</p>
          ) : !loading && query && filteredItemsList.length === 0 ? (
            <p className="error">
              There are no {itemCategory} matching the query
            </p>
          ) : null}

          {error !== '' && (
            <>
              <p className="error">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="reload-btn orange-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
                Reload
              </button>
            </>
          )}
          {currentPageUrlHas && (
            <section className="pagination-products">
              <div className="pagination-wrapper">
                <button
                  className={classNames('prev-btn prev-btn-pagination', {
                    'disabled-btn': currentPage === 1,
                  })}
                  onClick={() => {
                    PrevOrNextItems({
                      onStartItem: setStartItem,
                      onEndItem: setEndItem,
                      onCurrentPage: setCurrentPage,
                      urlParamsString: searchParams,
                      onUrlParamsString: setSearchParams,
                      actuallyPage: currentPage,
                      updatePerPage: itemsPerPage,
                      isNext: false,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                ></button>
                <ul className="pagination">
                  {countLInk.slice(startDigit, endDigit).map(item => (
                    <li
                      key={item}
                      className={classNames('', {
                        'active-li': currentPage === item,
                      })}
                    >
                      <Link
                        to={'#0'}
                        className="pagination-links"
                        onClick={e => {
                          e.preventDefault();
                          paginationDigitLink({
                            link: item,
                            perPage: itemsPerPage,
                            onCurrentPage: setCurrentPage,
                            urlParamsString: searchParams,
                            onUrlParamsString: setSearchParams,
                            actuallyPage: currentPage,
                            updatePerPage: itemsPePageUrl
                              ? +itemsPePageUrl
                              : 16,
                          });
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  // to={'#'}
                  className={classNames('next-btn next-btn-pagination', {
                    'disabled-btn-without-rotate': currentPage === lastPage,
                  })}
                  onClick={e => {
                    e.preventDefault();
                    PrevOrNextItems({
                      onStartItem: setStartItem,
                      onEndItem: setEndItem,
                      onCurrentPage: setCurrentPage,
                      urlParamsString: searchParams,
                      onUrlParamsString: setSearchParams,
                      actuallyPage: currentPage,
                      updatePerPage: itemsPerPage,
                      isNext: true,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === lastPage}
                ></button>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
