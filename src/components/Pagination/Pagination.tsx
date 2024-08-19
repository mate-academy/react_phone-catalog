import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getNumbers } from '../../utils/getNumbers';
import style from './Pagination.module.scss';
import cn from 'classnames';

type Props = {
  currentPage: number;
  visibleList: Product[];
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  visibleList,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(visibleList.length / perPage);

  const [device, setDevice] = useState<'mobile' | 'tablet'>(() => {
    if (window.innerWidth > 639) {
      return 'tablet';
    }

    return 'mobile';
  });

  useEffect(() => {
    const getWidth = () => {
      if (window.innerWidth > 639) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(visibleList.length / perPage)) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    if (totalPages < 6) {
      return getNumbers(1, totalPages);
    }

    if (device === 'tablet') {
      if (currentPage < 6) {
        pageNumbers.push(2, 3, 4, 5, 6, 7);
        pageNumbers.push('...');
      } else if (currentPage > totalPages - 5) {
        pageNumbers.push('...');
        getNumbers(totalPages - 6, totalPages - 1).map(num =>
          pageNumbers.push(num),
        );
      } else {
        pageNumbers.push('...');
        getNumbers(currentPage - 2, currentPage + 2).map(num =>
          pageNumbers.push(num),
        );
        pageNumbers.push('...');
      }
    } else {
      if (currentPage < 3) {
        pageNumbers.push(2, 3);
        pageNumbers.push('...');
      } else if (currentPage > totalPages - 2) {
        pageNumbers.push('...');
        getNumbers(totalPages - 2, totalPages - 1).map(num =>
          pageNumbers.push(num),
        );
      } else {
        pageNumbers.push('...', currentPage, '...');
      }
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={style.pagination}>
      <button
        className={`${style.arrow} ${style['arrow--left']}`}
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      />

      <ul className={style.numbers}>
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={cn(style.number, {
              [style['number--notEmpty']]: page !== '...',
              [style['number--active']]: currentPage === page,
            })}
            onClick={() => page === +page && onPageChange(page)}
          >
            {page === '...' ? <span>...</span> : page}
          </li>
        ))}
      </ul>

      <button
        className={`${style.arrow} ${style['arrow--right']}`}
        onClick={handleNextPage}
        disabled={currentPage >= Math.ceil(visibleList.length / perPage)}
      />
    </div>
  );
};
