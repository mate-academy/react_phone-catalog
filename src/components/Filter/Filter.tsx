import styles from './Filter.module.scss';
import React, { useState } from 'react';
import { ListItens } from '../ListItens/ListItens';
import { phonesData as defaultHotPricesData } from '../../data/phonesData';

export const Filter = ({ initialData = defaultHotPricesData }) => {
  const [data, setData] = useState(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const itemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moreCheaper = (value: string) => {
    let result = [...data];

    if (value === 'cheaper') {
      result.sort((a, b) => Number(a.priceDiscount) - Number(b.priceDiscount));
    } else if (value === 'expansive') {
      result.sort((a, b) => Number(b.priceDiscount) - Number(a.priceDiscount));
    } else if (value === 'newest') {
      result = [...initialData];
    }

    setData(result);
  };

  const maxButtons = 4;
  const startButton =
    Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
  const endButton = Math.min(startButton + maxButtons - 1, totalPages);
  const pageNumbers = [];

  for (let i = startButton; i <= endButton; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeader}>
        <div className={styles.filterSort}>
          <h2 className={styles.filterSortText}>Sort by</h2>
          <select
            className={styles.filterSelect}
            onChange={e => moreCheaper(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="cheaper">More cheaper</option>
            <option value="expansive">More expansive</option>
          </select>
        </div>

        <div className={styles.filterSort}>
          <h2 className={styles.filterSortText}>Items on page</h2>
          <select className={styles.filterSelect} onChange={itemsPerPageChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>

      <ListItens list={paginatedData} />

      <div className={styles.pagination}>
        <button
          onClick={goToBack}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          <img
            src="src/Icons/rigthArrowBlack.svg"
            alt="Back"
            className={styles.paginationButtonBackImg}
          />
        </button>

        {pageNumbers.map(num => (
          <button
            key={num}
            className={`${styles.paginationIndex} ${currentPage === num ? styles.activePage : ''}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          <img
            src="src/Icons/rigthArrowBlack.svg"
            alt="Next"
            className={styles.paginationButtonNextImg}
          />
        </button>
      </div>
    </div>
  );
};
