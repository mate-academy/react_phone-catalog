import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { useAppDispatch } from '../../hooks.ts';
import { ParamValue } from '../../hooks/useSearchParamValue.ts';

import { Button } from '../Button';
import { PaginationPageButton } from '../PaginationPageButton/PaginationPageButton';

import styles from './Pagination.module.scss';
const { pagination, pagination__pages } = styles;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newValue: ParamValue) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    dispatch(setScrollToTop('auto'));
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage, '...', totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={pagination}>
      <Button
        bgImg={`${import.meta.env.BASE_URL}icons/icon-arrow.svg`}
        action={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        additionalStyles={{ transform: 'rotate(-180deg)' }}
      />

      <div className={pagination__pages}>
        {pageNumbers.map((page, index) => (
          <PaginationPageButton
            key={index}
            currentPage={currentPage}
            pageNumber={page}
            onPageChange={handlePageChange}
          />
        ))}
      </div>

      <Button
        bgImg={`${import.meta.env.BASE_URL}icons/icon-arrow.svg`}
        action={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        additionalStyles={{}}
      />
    </div>
  );
};
