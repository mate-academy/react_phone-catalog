import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ICONS } from '../../icons';
import './Pagination.scss';

type Props = {
  totalPages: number,
  currentPage: number,
  perPage: string,
  onPageChange: (page: number) => void;
};

const MAX_PAGES = 3;

function showVisiblePages(selectedPage: number, allPages: number) {
  const pages: number[] = [];
  const visiblePages = selectedPage + MAX_PAGES - 1;
  const fistPage = selectedPage - (visiblePages - allPages);

  if (allPages <= MAX_PAGES) {
    for (let i = 1; i <= allPages; i += 1) {
      pages.push(i);
    }

    return pages;
  }

  if (visiblePages > allPages) {
    for (let i = fistPage; i <= allPages; i += 1) {
      pages.push(i);
    }
  } else {
    for (let i = selectedPage - 1; i < visiblePages; i += 1) {
      if (i > 0) {
        pages.push(i);
      }
    }
  }

  return pages;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  perPage,
  onPageChange,
}) => {
  const [searchParams] = useSearchParams();
  const numberOfPages: number[] = showVisiblePages(currentPage, totalPages);

  const perPageURL = searchParams.get('perPage') || '';

  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === totalPages;

  const getSearchPages = (page: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page);
    if (!perPageURL) {
      params.set('perPage', perPage);
    }

    return params.toString();
  };

  return (
    <div className="pagination">
      <ul className="pagination_list">
        <li
          className="page-item page-item--hide"
        >
          <Link
            to={{ search: getSearchPages((currentPage - 1).toString()) }}
            data-cy="prevLink"
            className={cn('page-link products-slider_btn page-btns', {
              'products-slider_btn--disabled': isFirstPage,
            })}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          >
            {isFirstPage ? (
              <img src={ICONS.arrowLeftDisabled} alt="Scroll left disabled" />
            ) : (
              <img src={ICONS.arrowLeft} alt="Scroll left" />
            )}
          </Link>
        </li>
        {totalPages <= MAX_PAGES ? (
          <>
            {numberOfPages.map(page => (
              <li
                className={cn('page-item', 'products-slider_btn', {
                  'page-item--active': page === currentPage,
                })}
                key={page}
              >
                <Link
                  data-cy="pageLink"
                  className="page-link body-text-style"
                  to={{ search: getSearchPages(page.toString()) }}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
          </>
        ) : (
          <>
            {!numberOfPages.includes(1) && (
              <>
                <li
                  className={cn({
                    'page-item': true,
                    'products-slider_btn': true,
                  })}
                >
                  <Link
                    data-cy="pageLink"
                    className="page-link body-text-style"
                    to={{ search: getSearchPages('1') }}
                    onClick={() => onPageChange(1)}
                  >
                    {1}
                  </Link>
                </li>
                {!numberOfPages.includes(2) && (
                  <div className="page-item body-text-style">. . .</div>
                )}
              </>
            )}
            {numberOfPages.map(page => (
              <li
                className={cn('page-item', 'products-slider_btn', {
                  'page-item--active': page === currentPage,
                })}
                key={page}
              >
                <Link
                  data-cy="pageLink"
                  className="page-link body-text-style"
                  to={{ search: getSearchPages(page.toString()) }}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            {!numberOfPages.includes(totalPages) && (
              <>
                <div className="page-item body-text-style">. . .</div>
                <li
                  className={cn({
                    'page-item': true,
                    'products-slider_btn': true,
                  })}
                >
                  <Link
                    data-cy="pageLink"
                    className="page-link body-text-style"
                    to={{ search: getSearchPages(totalPages.toString()) }}
                    onClick={() => onPageChange(totalPages)}
                  >
                    {totalPages}
                  </Link>
                </li>
              </>
            )}
          </>
        )}
        <li
          className="page-item page-item--hide"
        >
          <Link
            to={{ search: getSearchPages((currentPage + 1).toString()) }}
            data-cy="nextLink"
            className={cn(
              'page-link',
              'page-btns',
              'products-slider_btn',
              {
                'products-slider_btn--disabled': isLastPage,
              },
            )}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          >
            {isLastPage ? (
              <img src={ICONS.arrowRigntDisabled} alt="Scroll right" />
            ) : (
              <img src={ICONS.arrowRignt} alt="Scroll right" />
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};
