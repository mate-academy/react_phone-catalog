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
  const arrayOfPageButtons = [];

  for (let i = 1; i <= numberOfPages; i++) {
    arrayOfPageButtons.push(i);
  }

  console.log(arrayOfPageButtons);

  const handleLeftArrowButtons = () => {
    console.log('before', displayedPage);
    const newPage = displayedPage - 1 < 1 ? 1 : displayedPage - 1;
    console.log('after', newPage);
    handleDisplayedPage(newPage);
  };

  const handleRightArrowButtons = () => {
    console.log('before', displayedPage);
    const newPage = displayedPage + 1 > numberOfPages ? numberOfPages : displayedPage + 1;
    console.log('after', newPage);
    handleDisplayedPage(newPage);
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handleLeftArrowButtons}
      >
        <img
          src={ChevronIcon}
          alt="Previous page"
        />
      </button>

      {arrayOfPageButtons.map(pageButton => (
        <button
          key={pageButton}
          className={styles.button}
          onClick={() => handleDisplayedPage(pageButton)}
        >
          {pageButton}
        </button>
      ))}

      <button
        className={classNames(styles.button, styles.next)}
        onClick={handleRightArrowButtons}
      >
        <img
          src={ChevronIcon}
          alt="Next page"
        />
      </button>
    </ul>
  );
};
