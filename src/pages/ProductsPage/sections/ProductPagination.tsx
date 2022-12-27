import classNames from 'classnames';
import { FC } from 'react';
import { PrevArrowIcon } from 'src/components/Icons/PrevArrowIcon';
import { NextArrowIcon } from 'src/components/Icons/NextArrowIcon';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from 'src/utils/helpers/searchHelper';
import { PaginationNumbers } from '../subsections/PaginationNumbers';

type Props = {
  perPage: number,
  totalProducts: number,
  currentPage: number,
};

export const ProductPagination: FC<Props> = ({
  perPage,
  totalProducts,
  currentPage,
}) => {
  const pageNumbers = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const numberOfPages = Math.ceil(totalProducts / (perPage || totalProducts));

  for (let i = 0; i < numberOfPages; i += 1) {
    pageNumbers.push(i + 1);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;
  const isSinglePage = pageNumbers.length === 1;
  const isPrevButtonDisabled = isFirstPage || isSinglePage;
  const isNextButtonDisabled = isLastPage || isSinglePage;

  const handlePrevButtonClick = () => {
    if (currentPage > 1) {
      setSearchParams(
        getSearchWith(searchParams, { page: `${currentPage - 1}` || null }),
      );
    }
  };

  const handleNextButtonClick = () => {
    if (currentPage < pageNumbers.length) {
      setSearchParams(
        getSearchWith(searchParams, { page: `${currentPage + 1}` || null }),
      );
    }
  };

  return (
    <div className="product-section__pagination pagination">
      <button
        type="button"
        className={classNames(
          'pagination__button-prev',
          'pagination__button',
          { 'pagination__button--disabled': isPrevButtonDisabled },
        )}
        onClick={handlePrevButtonClick}
      >
        <PrevArrowIcon />
      </button>

      <PaginationNumbers
        pageNumbers={pageNumbers}
        currentPage={currentPage}
      />

      <button
        type="button"
        className={classNames(
          'pagination__button-next',
          'pagination__button',
          { 'pagination__button--disabled': isNextButtonDisabled },
        )}
        onClick={handleNextButtonClick}
      >
        <NextArrowIcon />
      </button>
    </div>
  );
};
