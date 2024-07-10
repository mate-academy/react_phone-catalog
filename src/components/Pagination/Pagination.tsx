import React from 'react';
import styles from './Pagination.module.scss'
import ChevronIcon from '../../img/icons/ChevronIcon.svg'

export const Pagination: React.FC = () => {
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

      <button
        className={styles.button}
      >
        <img
          src={ChevronIcon}
          alt="Next page"
        />
      </button>
    </ul>
  )
}
