import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  totalItems: number;
};

export const Pagination: React.FC<Props> = ({ totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transformValue, setTransformValue] = useState(
    searchParams.get('trans') || 0,
  );
  const currPage = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 'All';
  const totalPages = Math.ceil(totalItems / +perPage);
  const query = searchParams.get('query');

  const { theme } = useAppSelector(state => state.theme);

  const getNumberOfPages = (total: number) => {
    const numbers = [];

    for (let i = 1; i <= total; i += 1) {
      numbers.push(i);
    }

    return numbers;
  };

  const numbersOfPage = getNumberOfPages(totalPages);

  const [groupIndex, setGroupIndex] = useState(searchParams.get('group') || 0);

  const itemsPerPage = 4;
  const start = +groupIndex * itemsPerPage;
  const end = start + itemsPerPage;
  const currentGroup = numbersOfPage.slice(start, end);

  const firstItemOnPage = currentGroup[0];
  const lastItemOnPage = currentGroup[3];

  const handleButtonRight = () => {
    const params = new URLSearchParams(searchParams);

    if (+currPage !== totalPages) {
      params.set('page', `${+currPage + 1}`);
    } else {
      params.get('page');
    }

    if (+currPage === lastItemOnPage) {
      setGroupIndex(+groupIndex + 1);
      setTransformValue(+transformValue + 160);
      params.set('group', `${+groupIndex + 1}`);
      params.set('trans', `${+transformValue + 160}`);
    }

    setSearchParams(params);
  };

  const handleButtonLeft = () => {
    const params = new URLSearchParams(searchParams);

    if (+currPage !== 1) {
      params.set('page', `${+currPage - 1}`);
    } else {
      params.get('page');
    }

    if (+currPage === firstItemOnPage) {
      setGroupIndex(+groupIndex - 1);
      setTransformValue(+transformValue - 160);
      params.set('group', `${+groupIndex - 1}`);
      params.set('trans', `${+transformValue - 160}`);
    }

    setSearchParams(params);
  };

  const handleChange = (item: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', item.toString());

    setSearchParams(params);
  };

  useEffect(() => {
    if (query || query === '') {
      setTransformValue(0);
      setGroupIndex(0);
    }
  }, [query]);

  return (
    <div className="pagination">
      <button
        className={classNames('pagination__button pagination__button-left', {
          'pagination__button-left--disable': +currPage === 1,
        })}
        onClick={handleButtonLeft}
        disabled={+currPage === 1}
      >
        <img
          src={theme === 'light-theme' ? arrow : arrowDark}
          alt="ArrowLeft"
          className="pagination__button-imgLeft"
        />
      </button>

      <div className="pagination__block">
        <ul
          className="pagination__list"
          style={{ transform: `translateX(-${+transformValue}px)` }}
        >
          {numbersOfPage.map(item => (
            <li
              key={item}
              className={classNames('pagination__item', {
                'pagination__item--active': item === +currPage,
              })}
              onClick={() => handleChange(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={classNames('pagination__button pagination__button-right', {
          'pagination__button-right--disable': +currPage === totalPages,
        })}
        onClick={handleButtonRight}
        disabled={+currPage === totalPages}
      >
        <img
          src={theme === 'light-theme' ? arrow : arrowDark}
          alt="ArrowRight"
          className="pagination__button-imgRight"
        />
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';
