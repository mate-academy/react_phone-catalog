import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/api';
import { getSearchWith } from '../../utils/searchHelpers';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Left_banner from '../../images/homePage/Left_banner.svg';
import Vec_light_left from '../../images/homePage/Vec_light_left.svg';
import Vec_light_left_dark from '../../images/homePage/Vec_light_left_dark.svg';
import Arrow_Right from '../../images/homePage/Arrow_Right.svg';
import Right_banner from '../../images/homePage/Right_banner.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
/* eslint-disable-next-line max-len */
import Vec_light_right_dark from '../../images/homePage/Vec_light_right_dark.svg';
import './Pagination.scss';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ThemeVars } from '../../types/themeTypes';
import { getListParams } from '../../pages/ProductPage/getListParams';
import { Product } from '../../types/product';

type Props = {
  products: Product[];
};

export const Pagination: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useAppSelector(state => state.themeSwitcher.theme);

  if (products === undefined) {
    return null;
  }

  const { perPage, currentPage } = getListParams(searchParams);

  const itemsPerPage = perPage === 'all' ? products.length : perPage;

  const total = () => {
    if (perPage === 'all') {
      return products.length;
    } else {
      return Math.ceil(products.length / +itemsPerPage);
    }
  };

  const totalPages = total();

  const getTotalNumbersArray = (): number[] => {
    return getNumbers(1, totalPages);
  };

  const numbersToShow = 3;

  const currentPageNum = parseInt(currentPage);

  const min = Math.max(1, currentPageNum - numbersToShow / 2);
  const max = Math.min(
    totalPages,
    currentPageNum +
      numbersToShow / 2 +
      Math.max(0, min - currentPageNum + numbersToShow / 2),
  );

  const numbersToLoad = getTotalNumbersArray().slice(min - 1, max);

  const handlePrevPage = () => {
    setSearchParams({
      page: `${+currentPage - 1}`.toString(),
      perPage: perPage,
    });
  };

  const handleNextPage = () => {
    setSearchParams({
      page: `${+currentPage + 1}`.toString(),
      perPage: perPage,
    });
  };

  const arrLeft = () => {
    if (theme === ThemeVars.DARK) {
      return +currentPage === 1 ? Vec_light_left_dark : Left_banner;
    } else {
      return +currentPage === 1 ? Vec_light_left : Arrow_Left;
    }
  };

  const arrRight = () => {
    if (theme === ThemeVars.DARK) {
      return +currentPage === totalPages ? Vec_light_right_dark : Right_banner;
    } else {
      return +currentPage === totalPages ? Vec_light_right : Arrow_Right;
    }
  };

  const buttonArr = `pagination__button theme-${theme}`;
  const pagItem = `pagination__item theme-${theme}`;
  const pagLink = `pagination__link__is-active theme-${theme}`;
  const pagNumber = `pagination__link theme-${theme}`;
  const pagImage = `pagination__image theme-${theme}`;

  return (
    <div className="pagination">
      <button
        disabled={+currentPage === 1}
        className={classNames(`${buttonArr} pagination__button__left`)}
        onClick={handlePrevPage}
      >
        <img src={arrLeft()} alt="arrow_left" className={pagImage} />
      </button>
      {numbersToLoad.map(page => (
        <li
          key={page}
          className={classNames(`${pagItem}`, {
            active: +currentPage === page,
          })}
        >
          <Link
            className={classNames(
              `${pagNumber}`,
              +currentPage === page ? `${pagLink}` : '',
            )}
            to={{
              search: getSearchWith(searchParams, { page: page.toString() }),
            }}
          >
            {page}
          </Link>
        </li>
      ))}
      <button
        disabled={+currentPage === totalPages}
        className={classNames(`${buttonArr} pagination__button__right`)}
        onClick={handleNextPage}
      >
        <img src={arrRight()} alt="arrow_right" className={pagImage} />
      </button>
    </div>
  );
};
