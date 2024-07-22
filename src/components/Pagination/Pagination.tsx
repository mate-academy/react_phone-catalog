import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../../types/SearchParamsValue';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Pagination.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';

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
    const indexStart = Math.max(0, currentIndex - Math.floor(limit / 2));

    let res: (number | string)[] = [...pageNumbers.slice(indexStart)];

    if (res.length > limit) {
      res.length = limit;
    } else {
      res = [...pageNumbers.slice(-limit)];
    }

    if (res[0] !== 1) {
      res[0] = 1;
      res[1] = '...';
    }

    if (res[res.length - 1] !== pageNumbers[pageNumbers.length - 1]) {
      res[res.length - 1] = pageNumbers[pageNumbers.length - 1];
      res[res.length - 2] = '...';
    }

    return res;
  };

  const visiblePageNumbers = getVisiblePageNumbers(
    currentPage,
    numberOfPages,
    7,
  );

  const isDisabledPrev = currentPage <= 1;
  const isDisabledNext = currentPage === numberOfPages;

  return (
    <div className={styles.block}>
      <button
        type="button"
        className={classNames(`${btnStyles.block} ${btnStyles.squareSm}`, {
          [btnStyles.disabled]: isDisabledPrev,
        })}
        onClick={() => handlePage(currentPage - 1)}
        disabled={isDisabledPrev}
        aria-label={t(TRANSLATIONS.pagination.button.prev.ariaLabel)}
      >
        <span className={`${iconStyles.block} ${iconStyles.arrowLeft}`}></span>
      </button>

      <ul className={styles.pages}>
        {visiblePageNumbers.map((page, index) => {
          return typeof page === 'number' ? (
            <li key={index}>
              <button
                type="button"
                className={classNames(
                  `${btnStyles.block} ${btnStyles.squareSm}`,
                  {
                    [btnStyles.page]: page !== currentPage,
                    [btnStyles.pageSelected]: page === currentPage,
                  },
                )}
                onClick={() => handlePage(page)}
                disabled={page === currentPage}
                aria-label={t(TRANSLATIONS.pagination.button.numb.ariaLabel, {
                  page,
                })}
              >
                {page}
              </button>
            </li>
          ) : (
            <div key={index}>...</div>
          );
        })}
      </ul>

      <button
        type="button"
        className={classNames(`${btnStyles.block} ${btnStyles.squareSm}`, {
          [btnStyles.disabled]: isDisabledNext,
        })}
        onClick={() => handlePage(currentPage + 1)}
        disabled={isDisabledNext}
        aria-label={t(TRANSLATIONS.pagination.button.next.ariaLabel)}
      >
        <span className={`${iconStyles.block} ${iconStyles.arrowRight}`}></span>
      </button>
    </div>
  );
};
