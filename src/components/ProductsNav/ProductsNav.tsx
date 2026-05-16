import React from 'react';
import styles from './ProductsNav.module.scss';
import '../../styles/App.scss';
import CountButton from '../CountButton';
import PageButton from '../PageButton';

type ProductsNavProps = {
  currentPage: number;
  totalPages: number;
  onSetCurrentPage: (page: number) => void;
};

const ProductsNav: React.FC<ProductsNavProps> = ({
  currentPage,
  totalPages,
  onSetCurrentPage,
}) => {
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  function handleNextPage() {
    if (currentPage === totalPages) {
      onSetCurrentPage(totalPages);

      return;
    }

    onSetCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage === 1) {
      onSetCurrentPage(1);

      return;
    }

    onSetCurrentPage(currentPage - 1);
  }

  return (
    <div className={styles['products-nav']}>
      <PageButton onSwitchPage={handlePrevPage} disabled={isFirstPage}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z"
            fill="currentColor"
          />
        </svg>
      </PageButton>
      <div className={styles['products-nav__count-buttons']}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          if (
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1 ||
            page === currentPage - 2 ||
            page === currentPage + 2
          ) {
            return (
              <CountButton
                key={page}
                active={currentPage === page}
                value={page}
                setCurrentPage={onSetCurrentPage}
              >
                {page}
              </CountButton>
            );
          }

          return null;
        })}
      </div>
      <PageButton onSwitchPage={handleNextPage} disabled={isLastPage}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
            fill="currentColor"
          />
        </svg>
      </PageButton>
    </div>
  );
};

export default ProductsNav;
