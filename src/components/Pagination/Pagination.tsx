import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../../types/SearchParamsValue';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  currentPage: number;
  numberOfPages: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const handlePage = (number: number) => {
    const params = new URLSearchParams(searchParams);

    if (number === 1) {
      params.delete(SearchParamsValue.PAGE);
    } else {
      params.set(SearchParamsValue.PAGE, `${number}`);
    }

    setSearchParams(params);
  };

  const getVisiblePageNumbers = (
    current: number,
    total: number,
    limit: number,
  ) => {
    const pageNumbers = Array.from(Array(total).keys()).map(v => v + 1);
    const currentIndex = pageNumbers.indexOf(current);

    if (total <= limit) {
      return pageNumbers;
    }

    if (total <= currentIndex + 3) {
      return pageNumbers.slice(-5);
    }

    if (currentIndex <= 2) {
      return pageNumbers.slice(0, 5);
    }

    return pageNumbers.slice(currentIndex - 2, currentIndex + 3);
  };

  const visiblePageNumbers = getVisiblePageNumbers(
    currentPage,
    numberOfPages,
    5,
  );

  const isDisabledPrev = currentPage <= 1;
  const isDisabledNext = currentPage === numberOfPages;

  return (
    <div className="pagination">
      <button
        type="button"
        className={classNames('btn btn--square-sm', {
          'btn--disabled': isDisabledPrev,
        })}
        onClick={() => handlePage(currentPage - 1)}
        disabled={isDisabledPrev}
        aria-label={t(TRANSLATIONS.pagination.button.prev.ariaLabel)}
      >
        <span className="icon icon--arrow-left"></span>
      </button>

      <ul className="pagination__pages">
        {visiblePageNumbers.map((page, index) => {
          return (
            <button
              key={index}
              type="button"
              className={classNames('btn btn--square-sm', {
                'btn--page': page !== currentPage,
                'btn--page-selected': page === currentPage,
              })}
              onClick={() => handlePage(page)}
              disabled={page === currentPage}
              aria-label={t(TRANSLATIONS.pagination.button.numb.ariaLabel, {
                page,
              })}
            >
              {page}
            </button>
          );
        })}
      </ul>

      <button
        type="button"
        className={classNames('btn btn--square-sm', {
          'btn--disabled': isDisabledNext,
        })}
        onClick={() => handlePage(currentPage + 1)}
        disabled={isDisabledNext}
        aria-label={t(TRANSLATIONS.pagination.button.next.ariaLabel)}
      >
        <span className="icon icon--arrow-right"></span>
      </button>
    </div>
  );
};
