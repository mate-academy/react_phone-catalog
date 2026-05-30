import styles from './PageSelector.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IconButton } from 'components/IconButton';

type PageSelectorProps = {
  listSize: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export const PageSelector = ({
  listSize,
  perPage,
  currentPage,
  onPageChange,
}: PageSelectorProps) => {
  const totalPages = Math.ceil(listSize / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <IconButton
        icon={
          <FiChevronLeft
            size={18}
            color={currentPage !== 1 ? '#313237' : '#B4BDC3'}
          />
        }
        useBorder
        width={'32px'}
        height={'32px'}
        onClick={handlePrev}
        isActive={currentPage !== 1}
      />
      <div className={styles.container__content}>
        {pages.map(page => (
          <div
            key={page}
            className={styles.container__content__item}
            onClick={() => onPageChange(page)}
          >
            <span
              className={
                page === currentPage
                  ? styles.container__content__item__selected
                  : styles.container__content__item__normal
              }
            >
              {page}
            </span>
          </div>
        ))}
      </div>
      <IconButton
        icon={
          <FiChevronRight
            size={18}
            color={currentPage !== totalPages ? '#313237' : '#B4BDC3'}
          />
        }
        useBorder
        width={'32px'}
        height={'32px'}
        onClick={handleNext}
        isActive={currentPage !== totalPages}
      />
    </div>
  );
};
