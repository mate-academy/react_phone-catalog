import classNames from 'classnames';
import { useTheme } from '../../context/ThemeContext';
import {
  getArrowLeftActiveIcon,
  getArrowLeftDisabledIcon,
  getArrowRightActiveIcon,
  getArrowRightDisabledIcon,
} from '../../utils/getIcons';
import styles from './Pagination.module.scss';

type Props = {
  shownOnPage: number;
  currPage: number;
  all: number;
  handleChangingPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  shownOnPage,
  currPage,
  all,
  handleChangingPage,
}) => {
  const { theme } = useTheme();
  const arrowLeftDisabledIcon = getArrowLeftDisabledIcon(theme);
  const arrowLeftActiveIcon = getArrowLeftActiveIcon(theme);
  const arrowRightDisabledIcon = getArrowRightDisabledIcon(theme);
  const arrowRightActiveIcon = getArrowRightActiveIcon(theme);

  const allPages = Math.ceil(all / shownOnPage);
  const isFirstPage = currPage === 1;
  const isLastPage = currPage === allPages;
  const isCurrPage = (page: number) => currPage === page;

  const visiblePagination = () => {
    const pages = [];
    const start = Math.max(1, Math.min(currPage - 1, allPages - 3));
    const end = Math.min(allPages, start + 3);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const goToPrevPage = () => {
    if (!isFirstPage) {
      handleChangingPage(currPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      handleChangingPage(currPage + 1);
    }
  };

  const chosePageFromList = (page: number) => {
    if (page !== currPage) {
      handleChangingPage(page);
    }
  };

  return (
    <ul className={styles.pagination}>
      <button
        className={classNames(styles.button, {
          [styles.buttonDisabled]: isFirstPage,
        })}
        disabled={isFirstPage}
        onClick={goToPrevPage}
      >
        {isFirstPage ? (
          <img src={arrowLeftDisabledIcon} alt="arrow-left-disabled" />
        ) : (
          <img src={arrowLeftActiveIcon} alt="arrow-left-active" />
        )}
      </button>

      {visiblePagination().map(page => (
        <button
          className={classNames(styles.button, {
            [styles.active]: currPage === page,
          })}
          disabled={isCurrPage(page)}
          onClick={() => chosePageFromList(page)}
          key={page}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(styles.button, {
          [styles.buttonDisabled]: isLastPage,
        })}
        disabled={isLastPage}
        onClick={goToNextPage}
      >
        {isLastPage ? (
          <img src={arrowRightDisabledIcon} alt="arrow-right-disabled" />
        ) : (
          <img src={arrowRightActiveIcon} alt="arrow-right-active" />
        )}
      </button>
    </ul>
  );
};
