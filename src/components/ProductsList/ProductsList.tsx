/* eslint-disable @typescript-eslint/indent */
import { useSearchParams } from 'react-router-dom';

//#region StateApp
import { FC, useEffect, useMemo, useState } from 'react';
//#endregion

//#region Types
import { Products } from 'src/types/products';
//#endregion

//#region Styles
import style from './productList.module.scss';
//#endregion

//#region Global / Shared Components
import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Cards';
import { PaginationPage } from '../Pagination/Pagination';
//#endregion

//#region Business logic / Utilities
import { sortItems } from './sortProducts';
import { Params, getSearchWith } from '../../utils/getSearch';
import { Skeleton } from '../Skeleton/Skeleton';
//#endregion

//#region Hooks
import { useTimer } from '../../Hooks/useTimer';
//#endregion

//#region Other
import { ToastContainer } from 'react-toastify';
import { t } from 'i18next';
//#endregion

type Props = {
  data: Products[];
  title: string;
  isLoading: boolean;
};

export enum SortBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export const ProductList: FC<Props> = ({ title, data, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingSort, setIsLoadingSort] = useState(false);
  const sortBySearch = (searchParams.get('sortBy') as SortBy) || null;
  const perPageSearch = searchParams.get('perPage') || '16';
  const currentPageSearch = +(searchParams.get('page') || 1);

  const currentPage = +currentPageSearch;
  const selected = sortBySearch ?? t('sortBy.Chose');
  const perPage = perPageSearch === 'All' ? 'All' : +perPageSearch;

  const sortPage = [16, 8, 4, 'All'];
  const sortBy: SortBy[] = [
    SortBy.Newest,
    SortBy.Alphabetically,
    SortBy.Cheapest,
  ];

  const { start, clear } = useTimer();

  useEffect(() => {
    setIsLoadingSort(true);

    start(() => {
      setIsLoadingSort(false);
    }, 1000);

    return () => {
      clear();
    };
  }, [selected, start, clear]);

  function createSkeleton() {
    const DEFAULT_SKELETON_COUNT = 16;

    let count: number;

    if (typeof perPage === 'number' && !isNaN(perPage)) {
      count = perPage;
    } else {
      count = DEFAULT_SKELETON_COUNT;
    }

    return new Array(count).fill(0);
  }

  function setSearchWith(params: Params) {
    const newParams = getSearchWith(params, searchParams);

    setSearchParams(newParams);
  }

  const handlePageChange = (numPage: number) => {
    if (numPage === currentPage) {
      return;
    }

    setIsLoadingSort(true);

    if (perPage !== 4) {
      window.scrollTo({
        top: 150,
        behavior: 'smooth',
      });
    }

    start(() => {
      setIsLoadingSort(false);
    }, 1000);

    setSearchWith({ page: numPage });
  };

  const filteredAndSortedData = useMemo(() => {
    const dataCop = [...data];

    return sortItems(dataCop, selected);
  }, [data, selected]);

  const currentItems = useMemo(() => {
    const total = filteredAndSortedData.length;
    const perPages = perPage;
    let starts = 0;
    let end = total;

    if (typeof perPages !== 'string') {
      starts = (currentPage - 1) * perPages;
      end = Math.min(starts + perPages, total);
    }

    return filteredAndSortedData.slice(starts, end);
  }, [filteredAndSortedData, currentPage, perPage]);

  const handlePerPage = (per: number | string) => {
    setIsLoadingSort(true);

    start(() => {
      setIsLoadingSort(false);
    }, 1000);

    if (perPage !== per) {
      setSearchWith({ page: 1, perPage: per });
    }

    if (per === 'All') {
      setSearchWith({ perPage: per });
    }

    setSearchWith({ page: 1, sortPer: per });
  };

  return (
    <>
      <h2 className={`title ${style.title}`}>{title}</h2>
      <span className={style.quantity}>{data.length}</span>
      <div className={style.drowdowns}>
        <div>
          <span>{t('sortBy.sortBy')}</span>
          <Dropdown<string>
            sort={sortBy}
            selected={selected}
            onSelect={e => {
              setSearchWith({ sortBy: e, page: currentPage });
            }}
          />
        </div>
        <div>
          <span>{t('sortBy.itemsOnPage')}</span>
          <Dropdown<number | string>
            sort={sortPage}
            selected={perPage}
            onSelect={e => {
              handlePerPage(e);

              setSearchWith({ perPage: e, page: 1 });
            }}
          />
        </div>
      </div>

      <div className={style.wrapper}>
        <ToastContainer />
        <ul className={style.items}>
          {!isLoading && !isLoadingSort
            ? currentItems.map((item, i) => (
                <li key={item.id || i}>
                  <Card item={item} title="0" />
                </li>
              ))
            : createSkeleton().map((_, index) => <Skeleton key={index} />)}
        </ul>

        {perPage !== 'All' && (
          <div className={style.pagination}>
            <PaginationPage
              total={filteredAndSortedData.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
