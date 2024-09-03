import React from 'react';
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

  const handleLeftArrowClick = () => {
    const newPage = Math.max(displayedPage - 1, 1);
    handleDisplayedPage(newPage);
  };

  const handleRightArrowClick = () => {
    const newPage = Math.min(displayedPage + 1, numberOfPages);
    handleDisplayedPage(newPage);
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handleLeftArrowClick}
        disabled={displayedPage === 1}
      >
        <img
          src={ChevronIcon}
          alt="Previous page"
        />
      </button>

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

      <button
        className={styles.button}
        onClick={handleRightArrowClick}
        disabled={displayedPage === numberOfPages}
      >
        <img
          src={ChevronIcon}
          alt="Next page"
        />
      </button>
    </ul>
  );
};
