import React, { useState } from 'react';
import styles from './Pagination.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';
import classNames from 'classnames';

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
  const [offset, setOffset] = useState(0);
  const [mvmtBalance, setMvmtBalance] = useState(0);

  const moveLeft = () => {
      if (mvmtBalance > 0) {
        setOffset(offset + 42)
        setMvmtBalance(mvmtBalance-1)
      }
  }

  const moveRight = () => {
    if (mvmtBalance < numberOfPages - 5)  {
      setOffset(offset - 42)
      setMvmtBalance(mvmtBalance+1)
    }
  }

  return (
    <ul className={styles.pagination}>
      <button
        className={`${styles.button} ${mvmtBalance === 0 ? styles.disabled : ""}`}
        onClick={moveLeft}
      >
        <img
          src={ChevronIcon}
          alt="Previous page"
        />
      </button>

      <div className={styles.topWrapper}>
        <div className={styles.buttonWrapper} style={{ transform: `translateX(${offset}px)` }}>
            {arrayOfPageButtons.map(pageButton => (
            <button
              key={pageButton}
              className={classNames(styles.button, {
                [styles.active]: pageButton === displayedPage,
              })}
              onClick={() => handleDisplayedPage(pageButton)}
            >
              {pageButton}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`${styles.button} ${mvmtBalance === numberOfPages - 5 ? styles.disabled : ""}`}
        onClick={moveRight}
      >
        <img
          src={ChevronIcon}
          alt="Next page"
          className={styles.next}
        />
      </button>
    </ul>
  );
};
