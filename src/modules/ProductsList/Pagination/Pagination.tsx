// import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { SortVariants } from '../../../utils/enums/sortVariants';

type Props = {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({ pages, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = +(searchParams.get('page') ?? 1);

  const PER_PAGE = searchParams.get(SortVariants.perPage);

  const SORT_BY = searchParams.get(SortVariants.sortBy);

  const [currentButton, setCurrentButton] = useState<number | string>(
    initialPage,
  );

  useEffect(() => {
    setCurrentButton(1);
  }, [PER_PAGE, SORT_BY]);

  const params = new URLSearchParams(searchParams);

  const numberOfPages = useMemo(() => {
    const pagesArray = [];

    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }, [pages]);

  const increasePage = () => {
    setCurrentButton(next =>
      (next as number) >= numberOfPages.length ? next : (next as number) + 1,
    );
  };

  const decreasePage = () => {
    setCurrentButton(prev =>
      (prev as number) <= 1 ? prev : (prev as number) - 1,
    );
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>(
    [],
  );

  useEffect(() => {
    let tempNumberOfPages: (number | string)[] = [...arrOfCurrButtons];

    const dotsInitial = '...';
    const dotsLeft = '... ';
    const dotsRight = ' ...';

    if ((currentButton as number) >= 1 && (currentButton as number) <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);

      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (
      (currentButton as number) > 4 &&
      (currentButton as number) < numberOfPages.length - 2
    ) {
      const sliced1 = numberOfPages.slice(
        (currentButton as number) - 2,
        currentButton as number,
      );
      const sliced2 = numberOfPages.slice(
        currentButton as number,
        (currentButton as number) + 1,
      );

      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if ((currentButton as number) > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);

      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(
        (arrOfCurrButtons[arrOfCurrButtons.length - 3] as number) + 1,
      );
    } else if (currentButton === dotsRight) {
      setCurrentButton((arrOfCurrButtons[3] as number) + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton((arrOfCurrButtons[3] as number) - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);

    setCurrentPage(currentButton as number);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton, pages]);

  const handlerChangePagination = (page: number | string) => {
    setCurrentButton(page);
  };

  useEffect(() => {
    params.set('page', String(currentButton));

    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li>
          <button onClick={decreasePage}>Decrease</button>
        </li>
        {arrOfCurrButtons.map((page, index) => (
          <li className="pagination__item" key={index}>
            <button
              onClick={() => handlerChangePagination(page)}
              className={classNames({
                [styles.pagination__btn_current]:
                  String(page) === String(currentButton),
              })}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button onClick={increasePage}>Increase</button>
        </li>
      </ul>
    </div>
  );
};
