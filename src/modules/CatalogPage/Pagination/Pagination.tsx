import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { Phone } from '../../../Types/type';
import style from './Pagination.module.scss';


interface PaginationProps {
  setItemsOnPage: (x: Phone[]) => void;
  sortNumber: number
  products: Phone[]
}

export const Pagination = ({ setItemsOnPage, sortNumber, products }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  
  const [currentPage, setCurrentPage] = useState(() => {
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? Number(pageFromUrl) : 1;
  });

  const totalPages = Math.ceil(products.length / sortNumber);

  useEffect(() => {
    setCurrentPage(1);
    handleSort(1);
  }, [sortNumber]);

  useEffect(() => {
    const start = (currentPage - 1) * sortNumber;
    const end = start + sortNumber;
    setItemsOnPage(products.slice(start, end));
  }, [currentPage, sortNumber, products]);

  const paginationNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    paginationNumbers.push(i + 1);
  }

  const handleSort = (page: number) => {
    const start = (page - 1) * sortNumber;
    const end = start + sortNumber;

    setItemsOnPage(products.slice(start, end));
    setCurrentPage(page);

    const newParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newParams.delete('page'); 
    } else {
      newParams.set('page', String(page));
    }
    setSearchParams(newParams);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handleSort(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handleSort(currentPage + 1);
    }
  };

  return (
    <div className={style.pagination}>
      <button
        className={style[`pagination__arrow pagination__arrow--left`]}
        onClick={() => prevPage()}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className={style.pagination__numbers}>
        {paginationNumbers.map((index: number) => (
          <button
            className={`${style.pagination__numbers__number} ${currentPage === index ? `${style[`is-active-pagination`]}` : ''}`}
            onClick={() => handleSort(index)}
            key={index}
          >
            {index}
          </button>
        ))}
      </div>
      <button
        className={style[`pagination__arrow pagination__arrow--right`]}
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};