import { useContext, useEffect, useState } from 'react';
import './Catalog.scss';
import { ProductsContext } from '../../context/ProductContext';
import { CustomPagination } from './CustomPagination';
import { ListOfProducts } from './ListOfProducts';
import { Sorter } from './Sorter';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { Tablets } from '../../types/Tablets';
import { Phones } from '../../types/Phones';
import { Accessories } from '../../types/Accessories';
import { getGoods } from '../../api';
import { getSortedPhones } from '../../utils/sortGoods';

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

  const sortedPhones = getSortedPhones(typeSort, goods, products);

  const itemsPerPageNum = itemPerPage === 'all' ? goods.length : +itemPerPage;
  const pageCount =
    itemPerPage === 'all' ? 1 : Math.ceil(goods.length / itemsPerPageNum);
  const startIndex = (currentPage - 1) * itemsPerPageNum;
  const endIndex = startIndex + itemsPerPageNum;
  const visiblePhones = sortedPhones.slice(startIndex, endIndex);

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

  return (
    <main className="catalog">
      <div className="navigation">
        <div className="navigation__right-vector">
          <Link to="/">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M7.59038 0.807088C7.83112 0.619846 8.16823 0.619846 8.40897 0.807088L14.409 5.47375C14.5714 5.60006 14.6663 5.79426 14.6663 5.99999V13.3333C14.6663 13.8638 14.4556 14.3725 14.0806 14.7475C13.7055 15.1226 13.1968 15.3333 12.6663 15.3333H3.33301C2.80257 15.3333 2.29387 15.1226 1.91879 14.7475C1.54372 14.3725 1.33301 13.8638 1.33301 13.3333V5.99999C1.33301 5.79426 1.42799 5.60006 1.59038 5.47375L7.59038 0.807088ZM2.66634 6.32605V13.3333C2.66634 13.5101 2.73658 13.6797 2.8616 13.8047C2.98663 13.9298 3.1562 14 3.33301 14H12.6663C12.8432 14 13.0127 13.9298 13.1377 13.8047C13.2628 13.6797 13.333 13.5101 13.333 13.3333V6.32605L7.99967 2.1779L2.66634 6.32605Z"
                fill="#F1F2F9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.33301 8.00001C5.33301 7.63182 5.63148 7.33334 5.99967 7.33334H9.99967C10.3679 7.33334 10.6663 7.63182 10.6663 8.00001V14.6667C10.6663 15.0349 10.3679 15.3333 9.99967 15.3333C9.63148 15.3333 9.33301 15.0349 9.33301 14.6667V8.66668H6.66634V14.6667C6.66634 15.0349 6.36786 15.3333 5.99967 15.3333C5.63148 15.3333 5.33301 15.0349 5.33301 14.6667V8.00001Z"
                fill="#F1F2F9"
              />
            </svg>
          </Link>
        </div>
        <div className="navigation__right-vector">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M0.528758 0.528606C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606L5.47157 4.52861C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141L1.47157 9.47141C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861L4.05735 5.00001L0.528758 1.47141C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
              fill="#4A4D58"
            />
          </svg>
        </div>
        <Link className="navigation__link" to={`/${location}`}>
          {location}
        </Link>
      </div>
      {isLoading && <Loader />}

      {!isLoading && goods.length > 0 && !isError && (
        <>
          <Header location={location} product={goods} />

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

      {isError && <Error />}
    </main>
  );
};
