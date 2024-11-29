import { useSelector } from 'react-redux';
import './Pagination.scss';
import { RootState } from '../../app/store';
import themeStyles from '../../styles/utils/themeStyles';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { scrollToTop } from '../ScrollToTop';

type Props = {
  pages: number;
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { arrow, disabledArrow } = themeStyles(currentTheme === 'light-theme');

  const getPageNumbers = () => {
    const maxVisiblePages = 4;
    const pagesForRender: (number | string)[] = [];

    if (pages <= maxVisiblePages + 2) {
      // Displaying all visible pages at once if the condition is valid
      for (let i = 1; i <= pages; i++) {
        pagesForRender.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2),
      );
      const endPage = Math.min(pages, startPage + maxVisiblePages - 1);

      // Beginning: shows "1 ..." if there are pages before the visible range
      if (startPage > 1) {
        pagesForRender.push(1);
        if (startPage > 2) {
          pagesForRender.push('...');
        }
      }

      // Main range of visible pages
      for (let i = startPage; i <= endPage; i++) {
        pagesForRender.push(i);
      }

      // End: shows "... N" if there are pages after the visible range
      if (endPage < pages) {
        if (endPage < pages - 1) {
          pagesForRender.push('...');
        }

        pagesForRender.push(pages);
      }
    }

    return pagesForRender;
  };

  const canLeftClick = currentPage !== 1;
  const canRightClick = currentPage < pages;

  const handlePageChange = (page: number, isPageButtonClicked = false) => {
    const newPage = isPageButtonClicked
      ? page
      : Math.min(Math.max(currentPage + page, 1), pages);

    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());

    setSearchParams(params);
  };

  const handleLeftClick = () => {
    if (canLeftClick) {
      handlePageChange(currentPage - 1, true);
    }
  };

  const handleRightClick = () => {
    if (canRightClick) {
      handlePageChange(currentPage + 1, true);
    }
  };

  return (
    <div className="pagination">
      <button
        className={classNames('arrow-button', {
          'arrow-button-disabled': !canLeftClick,
        })}
        onClick={() => {
          scrollToTop();
          handleLeftClick();
        }}
        disabled={!canLeftClick}
      >
        <img
          src={canLeftClick ? arrow : disabledArrow}
          alt="Pagination left button"
          className="icon icon-left"
        />
      </button>

      <div className="pagination__pages">
        {getPageNumbers().map((page, index) => {
          return page === '...' ? (
            <span
              key={index}
              className="pagination__page pagination__page-dots"
            >
              {page}
            </span>
          ) : (
            <button
              key={index}
              className={classNames('pagination__page pagination-button', {
                'pagination-button-active': currentPage === +page,
              })}
              onClick={() => {
                handlePageChange(+page, true);
                scrollToTop();
              }}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={classNames('arrow-button', {
          'arrow-button-disabled': !canRightClick,
        })}
        onClick={() => {
          scrollToTop();
          handleRightClick();
        }}
        disabled={!canRightClick}
      >
        <img
          src={canRightClick ? arrow : disabledArrow}
          alt="Pagination right button"
          className="icon"
        />
      </button>
    </div>
  );
};
