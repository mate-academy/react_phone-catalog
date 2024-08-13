import React from 'react';
import styles from './Pagination.module.scss'
import ChevronIcon from '../../img/icons/ChevronIcon.svg'
import classNames from 'classnames';

// eslint-disable-next-line no-undef
type PaginationProps = {
  numberOfPages: number;
  handleDisplayedPage: (newState: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({numberOfPages, handleDisplayedPage}) => {
  let arrayOfPageButtons = [];
  for (let i = 1; i <= numberOfPages; i++) {
    arrayOfPageButtons.push(i)
  }

  console.log(arrayOfPageButtons)


  return (
    <ul className={styles.pagination}>


      <button
        className={styles.button}
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
      >
        <img
          src={ChevronIcon}
          alt="Next page"
        />
      </button>
    </ul>
  )
}
