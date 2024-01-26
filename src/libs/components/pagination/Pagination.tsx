import { Fragment } from 'react';
import classNames from 'classnames';

import './styles.scss';

import { IconNames, SearchParams, ELLIPSIS } from '../../enums';
import { Icon } from '../icon/Icon';
import { getVisiblePages } from '../../helpers';
import { SearchLink } from '../SearchLink';

type Props = {
  className?: string,
  pages: number[],
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  className,
  pages,
  currentPage,
}) => {
  const visiblePages = getVisiblePages(pages, currentPage);
  const firstPage = 1;
  const lastPage = pages.length;

  return (
    <div
      className={classNames(className, 'pagination')}
      data-cy="pagination"
    >
      <SearchLink
        className={classNames('pagination__link', {
          'pagination__link--disabled': currentPage === firstPage,
        })}
        aria-label="Previous page"
        params={{ [SearchParams.PAGE]: String(currentPage - 1 || firstPage) }}
        data-cy="paginationLeft"
      >
        <Icon icon={IconNames.ARROW} options={{ rotate: 180 }} />
      </SearchLink>

      <ul className="pagination__list">
        {visiblePages.map((page, index, array) => (
          <Fragment key={page}>
            <li>
              <SearchLink
                className={classNames('pagination__link', {
                  'pagination__link--active': page === currentPage,
                })}
                params={{ [SearchParams.PAGE]: String(page) }}
              >
                {page}
              </SearchLink>
            </li>
            {array[index + 1] - page > 1 && (
              <li className="pagination__ellipsis">
                {ELLIPSIS}
              </li>
            )}
          </Fragment>
        ))}
      </ul>

      <SearchLink
        className={classNames('pagination__link', {
          'pagination__link--disabled': currentPage === lastPage,
        })}
        aria-label="Previous page"
        params={{
          [SearchParams.PAGE]: String(
            currentPage === lastPage
              ? lastPage
              : currentPage + 1,
          ),
        }}
        data-cy="paginationRight"
      >
        <Icon icon={IconNames.ARROW} />
      </SearchLink>
    </div>
  );
};
