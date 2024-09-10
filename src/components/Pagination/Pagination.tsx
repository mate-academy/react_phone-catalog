import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import chevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import classNames from 'classnames';
import { useAppContext } from '../../context/AppContext';
import { useLocation, useHistory } from 'react-router-dom';

type PaginationProps = {
  numberOfPages: number;
  handleDisplayedPage: (newState: number) => void;
  displayedPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  numberOfPages,
  handleDisplayedPage,
  displayedPage,
}) => {
  const arrayOfPageButtons = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const [visiblePages, setVisiblePages] = useState<number[]>([1, 5]);
  const { theme } = useAppContext();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      handleDisplayedPage(Number(storedPage));
    }
  }, [handleDisplayedPage]);

  useEffect(() => {
    if (numberOfPages <= 5) {
      setVisiblePages([1, numberOfPages]);
    }
  }, [numberOfPages]);

  const move = (mvm: 1 | -1) => {
    if (displayedPage + mvm !== 0 && displayedPage + mvm !== numberOfPages + 1) {
      const newPage = displayedPage + mvm;
      handleDisplayedPage(newPage);

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', newPage.toString());
      history.push({ search: searchParams.toString() });

      localStorage.setItem('currentPage', newPage.toString());

      if (numberOfPages > 5) {
        setVisiblePages([visiblePages[0] + mvm, visiblePages[1] + mvm]);
      }
    }
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={`${styles.button} ${displayedPage === 1 ? styles.disabled : ""}`}
        onClick={() => move(-1)}
      >
        <img
          src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`}
          alt="Previous page"
        />
      </button>

      <div className={styles.topWrapper}>
        <div className={styles.buttonWrapper}>
          {arrayOfPageButtons.map(pageButton => (
            <div
              className={`${pageButton >= visiblePages[0] && pageButton <= visiblePages[1] ? "" : styles.hidden}`}
              key={pageButton}
            >
              <button
                className={classNames(styles.button, {
                  [styles.active]: pageButton === displayedPage,
                })}
                onClick={() => {
                  handleDisplayedPage(pageButton);
                  const searchParams = new URLSearchParams(location.search);
                  searchParams.set('page', pageButton.toString());
                  history.push({ search: searchParams.toString() });
                  localStorage.setItem('currentPage', pageButton.toString());
                }}
              >
                {pageButton}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.button} ${numberOfPages === displayedPage ? styles.disabled : ""}`}
        onClick={() => move(1)}
      >
        <img
          src={`${theme === 'dark' ? chevronIconDT : chevronIcon}`}
          alt="Next page"
          className={styles.next}
        />
      </button>
    </ul>
  );
};
