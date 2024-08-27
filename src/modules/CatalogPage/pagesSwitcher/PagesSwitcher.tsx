import React, { useEffect } from 'react';
import styles from './PagesSwitcher.module.scss';
import { updateURLParams } from './../services/updateUrl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setDisablePagesArrow,
  setPage,
  setStartShowFrom,
} from '../../../features/pagesDetailsSlice';

interface PagesSwitcherProps {
  sortBy: string;
  perPage: string;
  pagesWithProducts: number[];
}

export const PagesSwitcher: React.FC<PagesSwitcherProps> = ({
  sortBy,
  perPage,
  pagesWithProducts,
}) => {
  const root = document.documentElement;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '';

  const models = useAppSelector(state => state.pagesDetails.models);
  const isDark = useAppSelector(state => state.boolean.isDark);
  const startShowFrom = useAppSelector(
    state => state.pagesDetails.startShowFrom,
  );
  const disablePagesArrow = useAppSelector(
    state => state.pagesDetails.disablePagesArrow,
  );
  const pageState = useAppSelector(state => state.pagesDetails.page);

  const handlePageButton = (currentPage: number) => {
    dispatch(setPage(currentPage));
    dispatch(setDisablePagesArrow(''));
    navigate(updateURLParams(sortBy, perPage, currentPage, query));

    if (perPage !== 'all') {
      dispatch(setStartShowFrom(+perPage * (currentPage - 1)));
    } else {
      dispatch(setStartShowFrom(0));
    }
  };

  const handlePagesLeft = (): string | void => {
    dispatch(setDisablePagesArrow(''));

    if (pageState > 1) {
      navigate(updateURLParams(sortBy, perPage, pageState - 1, query));
    } else {
      dispatch(setDisablePagesArrow('disableLeft'));
    }

    const currentPosition = parseInt(
      getComputedStyle(root).getPropertyValue('--page-starts-from'),
    );

    const newPosition = currentPosition - 40;

    const DISABLE_BUTTON_POSITION = 0;

    if (pageState >= 1) {
      dispatch(setDisablePagesArrow(''));

      if (currentPosition > DISABLE_BUTTON_POSITION) {
        root.style.setProperty('--page-starts-from', `${newPosition}px`);
      } else if (newPosition <= DISABLE_BUTTON_POSITION && pageState === 1) {
        dispatch(setDisablePagesArrow('disableLeft'));
      }
    }
  };

  useEffect(() => {
    if (page && +page > 1 && +page <= 4) {
      dispatch(setDisablePagesArrow(''));
    } else if (page && +page > 4 && +page !== pagesWithProducts.length) {
      root.style.setProperty('--page-starts-from', `${+page * 40 - 160}px`);
      dispatch(setDisablePagesArrow(''));
    } else if (page && +page <= 4) {
      dispatch(setDisablePagesArrow('disableLeft'));
    } else if (page && +page === pagesWithProducts.length) {
      dispatch(setDisablePagesArrow('disableRight'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePagesRight = (): string | void => {
    dispatch(setDisablePagesArrow(''));

    if (pageState < pagesWithProducts.length) {
      navigate(updateURLParams(sortBy, perPage, pageState + 1, query));
    } else {
      dispatch(setDisablePagesArrow('disableRight'));
    }

    const currentPosition = parseInt(
      getComputedStyle(root).getPropertyValue('--page-starts-from'),
    );

    const newPosition = currentPosition + 40;

    const DISABLE_BUTTON_POSITION =
      Math.ceil(pagesWithProducts.length) * 32 +
      (Math.ceil(pagesWithProducts.length) - 1) * 8 -
      (4 * 32 + 3 * 8);

    if (pageState > 3 && pageState < pagesWithProducts.length) {
      dispatch(setDisablePagesArrow(''));

      if (currentPosition < DISABLE_BUTTON_POSITION) {
        root.style.setProperty('--page-starts-from', `${newPosition}px`);
      } else if (
        newPosition >= DISABLE_BUTTON_POSITION &&
        pageState === pagesWithProducts.length
      ) {
        dispatch(setDisablePagesArrow('disableRight'));
      }
    }
  };

  const numbersButtonStyles = (currentPage: number) => {
    if (!isDark) {
      if (currentPage - 1 === startShowFrom / +perPage) {
        return styles.numberOn;
      } else {
        return styles.numberOff;
      }
    } else {
      if (currentPage - 1 === startShowFrom / +perPage) {
        return styles.darkNumberOn;
      } else {
        return styles.darkNumberOff;
      }
    }
  };

  return (
    <>
      {perPage !== 'all' && Math.ceil(models / +perPage) > 1 && (
        <div className={styles.pages}>
          {perPage !== 'all' && Math.ceil(models / +perPage) > 4 && (
            <button
              onClick={handlePagesLeft}
              className={`
                ${styles.pages__arrowButton}
                ${isDark && styles.darkArrowButton}
                ${disablePagesArrow === 'disableLeft' && styles.disabledArrow}
                ${disablePagesArrow === 'disableLeft' && isDark && styles.darkDisabledArrow}
                `}
            >
              {isDark ? (
                <img
                  src="./icons/dark-theme-icons/white-arrow-left-ico.svg"
                  alt="arrow-left"
                />
              ) : (
                <img src="./icons/arrow-left-ico.svg" alt="arrow-left" />
              )}
            </button>
          )}

          <div className={styles.pages__numbersWindow}>
            <div className={styles.pages__numbers}>
              {pagesWithProducts?.map(currentPage => (
                <button
                  onClick={() => handlePageButton(currentPage)}
                  key={currentPage}
                  className={`
                    ${styles.pages__number}
                    ${isDark && styles.darkPagesNumber}
                    ${numbersButtonStyles(currentPage)}

                  `}
                >
                  {currentPage}
                </button>
              ))}
            </div>
          </div>

          {perPage !== 'all' && Math.ceil(models / +perPage) > 4 && (
            <button
              onClick={handlePagesRight}
              className={`
                ${styles.pages__arrowButton}
                ${disablePagesArrow === 'disableRight' && styles.disabledArrow}
                ${isDark && styles.darkArrowButton}
                ${disablePagesArrow === 'disableRight' && isDark && styles.darkDisabledArrow}

                `}
            >
              {isDark ? (
                <img
                  src="./icons/dark-theme-icons/white-arrow-right-ico.svg"
                  alt="arrow-right"
                />
              ) : (
                <img src="./icons/aroow-right-ico.svg" alt="arrow-right" />
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
};
