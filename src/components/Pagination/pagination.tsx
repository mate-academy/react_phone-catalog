import { useState } from 'react';
import './pagination.scss';
import { Phone } from '../../Types/type';
import phones from '../../../public/api/phones.json'
import tablets from '../../../public/api/tablets.json'
import accessories from '../../../public/api/accessories.json';
import { useLocation } from 'react-router-dom';

interface CatalogProps {
  itemsOnPage: Phone[];
  setItemsOnPage: (x: Phone[]) => void;
}

export const Pagination = ({ setItemsOnPage }: CatalogProps) => {
  const [currentPage, setcurrentPage] = useState(1);

  const location = useLocation();
  let data: Phone[] = [];

  if (location.pathname === '/phones') {
    data = phones;
  } else if (location.pathname === '/tablets') {
    data = tablets;
  } else if (location.pathname === '/accessories') {
    data = accessories
  }

  const sortNumber = 16;
  const totalPages = Math.ceil(data.length / sortNumber);

  const paginationNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    paginationNumbers.push(i + 1);
  }

  const handleSort = (page: number) => {
    const start = (page - 1) * sortNumber;
    const end = start + sortNumber;

    setItemsOnPage(data.slice(start, end));
    setcurrentPage(page);

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
    if (currentPage <= totalPages) {
      handleSort(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__arrow pagination__arrow--left"
        onClick={() => prevPage()}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className="pagination__numbers">
        {paginationNumbers.map((index: number) => (
          <button
            className={`pagination__numbers__number ${currentPage === index ? 'is-active-pagination' : ''}`}
            onClick={() => handleSort(index)}
            key={index}
          >
            {index}
          </button>
        ))}
      </div>
      <button
        className="pagination__arrow pagination__arrow--right"
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
