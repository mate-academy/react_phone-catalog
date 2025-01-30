import { Product } from '../../types/Product';
import { useState, useEffect } from 'react';
import style from './Pagination.module.scss';
import { getNumbers } from '../../services/getNumber';
import classNames from 'classnames';

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
  const allPages = Math.ceil(visibleList.length / perPage);

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

    if (allPages < 6) {
      return getNumbers(1, allPages);
    }

    if (device === 'tablet') {
      if (currentPage < 6) {
        pageNumbers.push(2, 3, 4, 5, 6, 7, '...');
      } else if (currentPage > allPages - 5) {
        pageNumbers.push('...');
        pageNumbers.push(...getNumbers(allPages - 6, allPages - 1));
      } else {
        pageNumbers.push('...');
        pageNumbers.push(...getNumbers(currentPage - 2, currentPage + 2));
        pageNumbers.push('...');
      }
    } else {
      if (currentPage < 3) {
        pageNumbers.push(2, 3, '...');
      } else if (currentPage > allPages - 2) {
        pageNumbers.push('...');
        pageNumbers.push(...getNumbers(allPages - 2, allPages - 1));
      } else {
        pageNumbers.push('...', currentPage, '...');
      }
    }

    pageNumbers.push(allPages);

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={style.pagination}>
      <button
        className={`${style.arrow} ${style['arrow--prev']}`}
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      />

      <ul className={style.numbers}>
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={classNames(style.number, {
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
        className={`${style.arrow} ${style['arrow--next']}`}
        onClick={handleNextPage}
        disabled={currentPage >= allPages}
      />
    </div>
  );
};
