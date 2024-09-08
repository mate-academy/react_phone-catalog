import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import chevronIconDT from '../../img/icons/ChevronIcon--DarkTheme.svg';
import classNames from 'classnames';
import { useAppContext } from '../../context/AppContext';

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
  const [visiblePages, setVisiblePages] = useState<number[]>([1,5]);
  const { theme } = useAppContext();

  useEffect(() => {
    if (numberOfPages <= 5) {
      setVisiblePages([1,numberOfPages]);
    }
  }, [numberOfPages]);


  const move = (mvm: 1 | -1) => {
    if (displayedPage + mvm !== 0 && displayedPage + mvm !== numberOfPages + 1) {
      handleDisplayedPage(displayedPage + mvm);
      setVisiblePages([visiblePages[0] + mvm, visiblePages[1] + mvm])
    }
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={`${styles.button}`}
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
            <div className={`${pageButton >= visiblePages[0] && pageButton <= visiblePages[1] ? "" : styles.hidden}`}>
              <button
                key={pageButton}
                className={classNames(styles.button, {
                  [styles.active]: pageButton === displayedPage,
                })}
                onClick={() => handleDisplayedPage(pageButton)}
              >
                {pageButton}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.button}`}
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
