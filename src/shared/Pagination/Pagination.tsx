import React, { useEffect, useRef } from "react";
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number,
  currentPage: string,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalPages,
  currentPage,
  searchParams,
  setSearchParams
}) => {
  const activeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [currentPage]);

  const handleSetCurrentPage = (num: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', num.toString());
    setSearchParams(params);
  }

  const handleSetNextCurrentPage = () => {
    if (+currentPage >= totalPages) {
      return;
    }

    const nextPage = +currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set('page', nextPage.toString());
    setSearchParams(params);
  }

  const handleSetPreviousCurrentPage = () => {
    if (+currentPage <= 1) {
      return;
    }

    const PreviousPage = +currentPage - 1;
    const params = new URLSearchParams(searchParams);
    params.set('page', PreviousPage.toString());
    setSearchParams(params);
  }
  
  return (
    <div className={styles.container}>
      <button 
        onClick={handleSetPreviousCurrentPage}
        disabled={+currentPage <= 1}
      >
        <span>{'<'}</span>
      </button>

      <ul>
      {Array.from({ length: totalPages }).map((_, index) => (
        <li 
          key={index}
          ref={currentPage === (index + 1).toString() ? activeRef : null}
          className={currentPage === (index + 1).toString() ? styles.selected : ''}
          onClick={() => handleSetCurrentPage(index + 1)}
        >
          {index + 1}
        </li>
      ))}
      </ul>

      <button 
        onClick={handleSetNextCurrentPage} 
        disabled={+currentPage >= totalPages} 
        >
          <span>{'>'}</span>
      </button>
    </div>
  )
}

export default Pagination;
