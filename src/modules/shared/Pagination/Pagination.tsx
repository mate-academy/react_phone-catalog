import { FC, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';
import { PaginationProps } from './types/types';
import './Pagination.scss';

const VISIBLE_PAGE_LIMIT = 4;

export const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useContext(GlobalContext);

  const totalPages = useMemo(
    () => Math.ceil(total / perPage),
    [total, perPage],
  );

  const pageRange = useMemo(() => {
    const halfLimit = Math.floor(VISIBLE_PAGE_LIMIT / 2);
    let startPage = Math.max(1, currentPage - halfLimit);
    const endPage = Math.min(totalPages, startPage + VISIBLE_PAGE_LIMIT - 1);

    if (endPage - startPage + 1 < VISIBLE_PAGE_LIMIT) {
      startPage = Math.max(1, endPage - VISIBLE_PAGE_LIMIT + 1);
    }

    return { startPage, endPage };
  }, [currentPage, totalPages]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderNavigationButton = (
    direction: 'prev' | 'next',
    isDisabled: boolean,
    onClick: () => void,
  ) => {
    const iconKey = direction === 'prev' ? 'arrow_left' : 'arrow_right';
    const disabledIconKey = `${iconKey}__disabled` as keyof typeof icons;
    const icon = isDisabled
      ? icons[disabledIconKey][theme]
      : icons[iconKey][theme];

    return (
      <button
        className={classNames('pagination__button', {
          'pagination__button--disabled': isDisabled,
        })}
        onClick={onClick}
        disabled={isDisabled}
      >
        <Icon icon={icon} />
      </button>
    );
  };

  const renderPageButtons = () => {
    const { startPage, endPage } = pageRange;
    const pageButtons = [];

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          className={classNames('pagination__button-page', {
            'pagination__button-page--active': currentPage === page,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>,
      );
    }

    return pageButtons;
  };

  return (
    <div className="pagination">
      {renderNavigationButton('prev', isFirstPage, handlePreviousPage)}

      <div className="pagination__button-container">{renderPageButtons()}</div>

      {renderNavigationButton('next', isLastPage, handleNextPage)}
    </div>
  );
};
