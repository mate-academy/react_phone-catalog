import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/products';
import styles from './Pagination.module.scss';
import ProductsList from '../ProductsList/ProductsList';
import { SortType } from '../../types/sortType';
import { DropDown } from '../DropDown';
import Arrow from '../Icons/Arrow/Arrow';
import { ArrowDirection } from '../../types/arrowDirection';
import classNames from 'classnames';

type Props = {
  products: Product[];
};

const options = ['All', '4', '8', '16'];
const sortType = Object.keys(SortType).map(
  sort => SortType[sort as keyof typeof SortType],
);

const getMaxCountPage = (products: Product[], perPage: number): number => {
  return Math.ceil((products.length || 1) / (perPage || 1));
};

const getPages = (products: Product[], perPage: number): number[] => {
  const pages = getMaxCountPage(products, +perPage);

  if (isNaN(perPage)) {
    return [];
  }

  return Array.from(Array(pages).keys()).map(el => el + 1);
};

const getPageProduct = (
  searchParams: URLSearchParams,
  products: Product[],
): Product[] => {
  const curPage = +(searchParams.get('page') || 1);
  const perPage = +(Number(searchParams.get('perPage')) || products.length);
  const sort = searchParams.get('sort');

  const correctedCurPage =
    curPage > getMaxCountPage(products, perPage)
      ? getMaxCountPage(products, perPage)
      : curPage <= 0
        ? 1
        : curPage;

  const newArr = products.slice(
    correctedCurPage * perPage - perPage,
    correctedCurPage * perPage,
  );

  switch (sort) {
    case SortType.alphabetically.toLowerCase():
      return newArr.sort((a, b) => b.name.localeCompare(a.name));
    case SortType.cheapest.toLowerCase():
      return newArr.sort((a, b) => a.price - b.price);
    case SortType.newest.toLowerCase():
      return newArr.sort((a, b) => b.year - a.year);
    default:
      return newArr;
  }
};

function capitalize(str: string) {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Pagination: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const preparedPerPage = capitalize(searchParams.get('perPage') || 'all');
  const preparedCurPage = +(searchParams.get('page') || 1);
  const preparedSort = capitalize(
    searchParams.get('sort') || SortType.alphabetically,
  );
  const [sort, setSort] = useState(preparedSort);
  const [perPage, setPerPage] = useState(preparedPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = getPages(products, +perPage);

  useEffect(() => {
    setPerPage(preparedPerPage);
    setSort(preparedSort);
    setCurrentPage(preparedCurPage);
  }, [searchParams, preparedPerPage, preparedSort, preparedCurPage]);

  const preparedProducts = getPageProduct(searchParams, products);
  const isPrev = currentPage > 1;
  const isNext = currentPage < getMaxCountPage(products, +perPage);

  const handleSelectPagination = (value: string): void => {
    setPerPage(value);
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');
    if (!isNaN(+value)) {
      newParams.set('perPage', value);
    } else {
      newParams.delete('perPage');
    }

    setSearchParams(newParams);
  };

  const handleSelectSort = (value: string): void => {
    setSort(value.toLowerCase());

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');
    newParams.set('sort', value.toLowerCase());

    setSearchParams(newParams);
  };

  const handleClickBtn = (page: number) => {
    setCurrentPage(page);

    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', `${page}`);
    setSearchParams(newParams);
  };

  const handleClickPrev = () => {
    const page = currentPage - 1;

    if (page <= 0) {
      return;
    }

    setCurrentPage(page);

    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', `${page}`);
    setSearchParams(newParams);
  };

  const handleClickNext = () => {
    const page = currentPage + 1;

    if (page > getMaxCountPage(products, +perPage)) {
      return;
    }

    setCurrentPage(page);

    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', `${page}`);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.Pagination}>
      <div className={styles.Pagination__control}>
        <DropDown
          startValue={sort}
          options={sortType}
          title="Sort by"
          classSelector={styles.Pagination__sort}
          onChange={handleSelectSort}
        />

        <DropDown
          startValue={perPage}
          options={options}
          title="Items on page"
          classSelector={styles.Pagination__pageSelector}
          onChange={handleSelectPagination}
        />
      </div>

      <ProductsList products={preparedProducts} />

      <div
        className={classNames(styles.Pagination__buttons, {
          hidden: pages.length === 0,
        })}
      >
        <button
          className={classNames(
            styles.Pagination__btn,
            styles.Pagination__navBtn,
          )}
          onClick={() => handleClickPrev()}
          disabled={!isPrev}
        >
          <Arrow direction={ArrowDirection.left} />
        </button>

        {pages.map(pageBtn => (
          <button
            key={pageBtn}
            className={classNames(styles.Pagination__btn, {
              [styles.Pagination__btn_active]: currentPage === pageBtn,
            })}
            onClick={() => handleClickBtn(pageBtn)}
          >
            {pageBtn}
          </button>
        ))}

        <button
          className={classNames(
            styles.Pagination__btn,
            styles.Pagination__navBtn,
          )}
          onClick={() => handleClickNext()}
          disabled={!isNext}
        >
          <Arrow direction={ArrowDirection.right} />
        </button>
      </div>
    </div>
  );
};
