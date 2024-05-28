import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import styles from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { SortVariants } from '../../../utils/enums/sortVariants';
import leftArrow from './../../../images/icons/chevron-left.svg';
import rightArrow from './../../../images/icons/pagination-right.svg';
import { scrollTop } from '../../../helpers/helpers';

type Props = {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({ pages, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = +(searchParams.get('page') ?? 1);

  const PER_PAGE = searchParams.get(SortVariants.perPage);

  const SORT_BY = searchParams.get(SortVariants.sortBy);

  const QUERY = searchParams.get(SortVariants.query);

  const [currentButton, setCurrentButton] = useState<number | string>(
    initialPage,
  );

  useEffect(() => {
    const pageParam = searchParams.get('page');

    setCurrentButton(pageParam ? +pageParam : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PER_PAGE, SORT_BY, QUERY]);

  const params = new URLSearchParams(searchParams);

  const numberOfPages = useMemo(() => {
    const pagesArray = [];

    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }, [pages]);

  const increasePage = () => {
    scrollTop();
    setCurrentButton(next =>
      (next as number) >= numberOfPages.length ? next : (next as number) + 1,
    );
  };

  const decreasePage = () => {
    scrollTop();
    setCurrentButton(prev =>
      (prev as number) <= 1 ? prev : (prev as number) - 1,
    );
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>(
    [],
  );

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    const dotsInitial = '...';
    const dotsLeft = '... ';
    const dotsRight = ' ...';

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (
      (currentButton as number) >= 1 &&
      (currentButton as number) <= 3
    ) {
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
    scrollTop();
  };

  useEffect(() => {
    params.set('page', String(currentButton));

    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton]);

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>
        <li className={(styles.pagination__prev, styles.pagination__controls)}>
          <button
            disabled={currentButton === 1}
            className={styles.pagination__navigation}
            onClick={decreasePage}
          >
            <img src={leftArrow} alt="Left arrow" />
          </button>
        </li>
        {arrOfCurrButtons.map((page, index) => (
          <li className={styles.pagination__item} key={index}>
            <button
              onClick={() => handlerChangePagination(page)}
              className={classNames(
                {
                  [styles.pagination__btn_current]:
                    String(page) === String(currentButton),
                },
                styles.pagination__button,
              )}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={(styles.pagination__next, styles.pagination__controls)}>
          <button
            disabled={currentButton === pages}
            className={styles.pagination__navigation}
            onClick={increasePage}
          >
            <img src={rightArrow} alt="Right arrow" />
          </button>
        </li>
      </ul>
    </div>
  );
};
