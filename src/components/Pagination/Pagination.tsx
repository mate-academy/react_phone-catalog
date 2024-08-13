import React from 'react';
import styles from './Pagination.module.scss'
import ChevronIcon from '../../img/icons/ChevronIcon.svg'
import classNames from 'classnames';

type PaginationProps = {
  numberOfProducts: number;
}

export const Pagination: React.FC<PaginationProps> = ({numberOfProducts}) => {

  let numebrOfProductsPerPage = 20; //LINK WITH DROPDOWN LATER
  let numberOfPages = Math.ceil(numberOfProducts / numebrOfProductsPerPage)
  let arrayOfPageButtons = [];

  for (let i = 1; i <= numberOfPages; i++) {
    arrayOfPageButtons.push(i)
  }

  console.log(numberOfProducts, numebrOfProductsPerPage, numberOfPages, arrayOfPageButtons)

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

      {arrayOfPageButtons.map(elem => (
        <button
        className={styles.button}
        >
          {elem}
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
