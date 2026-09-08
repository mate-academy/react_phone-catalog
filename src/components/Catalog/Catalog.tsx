import { useCallback, useContext, useEffect, useState } from 'react';
import './Catalog.scss';
import { ProductsContext } from '../../context/ProductContext';
import { CustomPagination } from './CustomPagination';
import { ListOfProducts } from './ListOfProducts';
import { Sorter } from './Sorter';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { Tablets } from '../../types/Tablets';
import { Phones } from '../../types/Phones';
import { Accessories } from '../../types/Accessories';
import { getGoods } from '../../api';
import {
  getPageCount,
  getSortedGoods,
  getVisibleProducts,
  searchFilter,
} from '../../utils/sortGoods';
import { NavigationCatalog } from './NavigationCatalog';
import debounce from 'lodash.debounce';
import { SearchCatalog } from './SearchCatalog';

export const Catalog = () => {
  const location = useLocation().pathname.replace('/', '');
  const { products } = useContext(ProductsContext);
  const [itemPerPage, setItemPerPage] = useState('all');
  const [typeSort, setTypeSort] = useState('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [goods, setGoods] = useState<Tablets[] | Phones[] | Accessories[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get('query'));

  useEffect(() => {
    setIsLoading(true);

    getGoods(location)
      .then(setGoods)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location]);

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const perPage = searchParams.get('perPage');
    const page = searchParams.get('page');

    if (sortParam) {
      setTypeSort(sortParam);
    }

    if (perPage) {
      setItemPerPage(perPage);
    }

    if (page) {
      setCurrentPage(+page);
    }
  }, [searchParams]);

  useEffect(() => {
    searchParams.set('page', '1');
  }, [location, itemPerPage, typeSort]);

  const sortedGoods = getSortedGoods(typeSort, goods, products);

  const [filteredGoods, setFilteredGoods] = useState([...sortedGoods]);

  const debouncedFilter = useCallback(
    debounce(
      (value: string, goodsToFilter: Tablets[] | Phones[] | Accessories[]) => {
        const result = searchFilter(goodsToFilter, value);

        setFilteredGoods(result);
      },
      500,
    ),
    [sortedGoods],
  );

  useEffect(() => {
    if (!searchValue) {
      setFilteredGoods(sortedGoods);

      return;
    }

    debouncedFilter(searchValue, sortedGoods);
  }, [searchValue, sortedGoods, debouncedFilter]);

  const pageCount = getPageCount(filteredGoods.length, itemPerPage);
  const visiblePhones = getVisibleProducts(
    filteredGoods,
    currentPage,
    itemPerPage,
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);

    if (page !== 1) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  };

  function sortOpenClose() {
    setIsSortOpen(!isSortOpen);
    setIsItemsOpen(false);
  }

  function itemIsOpen() {
    setIsItemsOpen(!isItemsOpen);
    setIsSortOpen(false);
  }

  function changeSortType(type: string) {
    setTypeSort(type);
    setIsSortOpen(false);

    searchParams.set('sort', type);
    setSearchParams(searchParams);
  }

  function changePerPage(perPage: string) {
    setItemPerPage(perPage);
    setIsItemsOpen(false);

    if (perPage !== 'all') {
      searchParams.set('perPage', perPage);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('perPage');
      setSearchParams(searchParams);
    }
  }

  function handleOfChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(searchParams);
    const value = e.target.value.trim();

    setSearchValue(value);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }

  return (
    <main className="catalog">
      <NavigationCatalog location={location} />
      {isLoading && <Loader />}

      {!isLoading && goods.length > 0 && !isError && (
        <>
          <Header location={location} product={goods} />

          <SearchCatalog
            searchValue={searchValue || ''}
            handleOfChangeInput={handleOfChangeInput}
          />

          <Sorter
            isSortOpen={isSortOpen}
            typeSort={typeSort}
            isItemsOpen={isItemsOpen}
            itemPerPage={itemPerPage}
            setIsItemsOpen={itemIsOpen}
            setIsSortOpen={sortOpenClose}
            changeSortType={changeSortType}
            changePerPage={changePerPage}
          />

          <ListOfProducts visibleProducts={visiblePhones} />

          {pageCount > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={handlePageClick}
            />
          )}
        </>
      )}

      {!isLoading && goods.length === 0 && !isError && (
        <p className="catalog-no-product">There are no {location} yet</p>
      )}

      {!isLoading && filteredGoods.length === 0 && !isError && (
        <p className="catalog-no-product">
          There are no {location} matching the query
        </p>
      )}

      {isError && <Error />}
    </main>
  );
};
