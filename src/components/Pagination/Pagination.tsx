import React, { useEffect, useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { IconType } from '../../types/IconTypes';
import { Icon } from '../Icon';
import './Pagination.scss';
import { getSearchWith } from '../../utils/getSearchWith';
import { getNumbers } from '../../helpers/getNumbers';
import { Colors } from '../../types/Colors';

interface Props {
  totalItems: number;
  perPage: number;
  searchName: string;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  totalItems,
  perPage,
  searchName,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / perPage);
  const pages = getNumbers(1, totalPages);

  const prevPage = useMemo(() => {
    if (currentPage === pages[0]) {
      return pages[0];
    }

    return currentPage - 1;
  }, [currentPage, pages]);

  const nextPage = useMemo(() => {
    if (currentPage === pages[pages.length - 1]) {
      return pages[pages.length - 1];
    }

    return currentPage + 1;
  }, [currentPage, pages]);

  const isFirstPage = useMemo(
    () => currentPage === pages[0],
    [currentPage, pages],
  );

  const isLastPage = useMemo(() => {
    return currentPage === pages[pages.length - 1];
  }, [currentPage, pages]);

  useEffect(() => {
    if (currentPage > pages[pages.length - 1]) {
      setSearchParams(
        getSearchWith({ page: pages[pages.length - 1] }, searchParams),
      );
    }
  }, [currentPage, pages, searchParams, setSearchParams]);

  return (
    <ul className="pagination" data-cy="pagination">
      <li>
        <NavLink
          data-cy="paginationLeft"
          to={{
            search: getSearchWith({ [searchName]: prevPage }, searchParams),
          }}
          className={classNames('pagination__link', 'pagination__link--prev', {
            'pagination__link--disabled': isFirstPage,
          })}
        >
          {isFirstPage ? (
            <Icon iconType={IconType.arrowLeft} color={Colors.disabled} />
          ) : (
            <Icon iconType={IconType.arrowLeft} />
          )}
        </NavLink>
      </li>

      {pages.map((page, index) => {
        if (
          page === currentPage
          || page === currentPage - 1
          || page === currentPage + 1
          || index === 0
          || index === pages.length - 1
          || (currentPage === pages[0] && page === pages[2])
          || (currentPage === pages[pages.length - 1]
            && page === pages[pages.length - 3])
        ) {
          return (
            <li key={page}>
              <NavLink
                to={{
                  search: getSearchWith({ [searchName]: page }, searchParams),
                }}
                className={classNames('pagination__link', {
                  'pagination__link--active': page === currentPage,
                })}
              >
                {page}
              </NavLink>
            </li>
          );
        }

        if (
          (page === currentPage - 2 && index !== 0)
          || (page === currentPage + 2 && index !== pages.length - 1)
          || (currentPage === pages[0] && page === pages[3])
          || (currentPage === pages[pages.length - 1]
            && page === pages[pages.length - 4])
        ) {
          return (<span key={page} className="pagination__skip">...</span>);
        }

        return (
          <></>
        );
      })}

      <li>
        <NavLink
          data-cy="paginationRight"
          to={{
            search: getSearchWith({ [searchName]: nextPage }, searchParams),
          }}
          className={classNames(
            'pagination__link',
            'pagination__link--next',
            {
              'pagination__link--disabled': isLastPage,
            },
          )}
        >
          {isLastPage ? (
            <Icon iconType={IconType.arrowRight} color={Colors.disabled} />
          ) : (
            <Icon iconType={IconType.arrowRight} />
          )}
        </NavLink>
      </li>
    </ul>
  );
};
