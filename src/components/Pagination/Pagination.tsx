import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SearchParams } from '../../types/SearchParams';
import { OptionsForSort } from '../../types/OptionsForSort';
import { SearchLink } from '../SearchLink';
import { DEF_START_PAGE } from '../../helpers/consts';

type Props = {
  totalPages: number,
  onSetCurrentPage: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  totalPages, onSetCurrentPage,
}) => {
  const [isDisabledLeft, setIsDisabledLeft] = useState<boolean>(true);
  const [isDisabledRight, setIsDisabledRight] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const shownPerPage = +(searchParams
    .get(SearchParams.ShownCards) || OptionsForSort.NumberSixteen);
  const currentPage = +(searchParams
    .get(SearchParams.PageNumber) || DEF_START_PAGE);

  const quantityPages = Math.ceil(totalPages / +shownPerPage);
  const allPages: number[] = [];

  for (let i = 1; i <= quantityPages; i += 1) {
    allPages.push(i);
  }

  useEffect(() => {
    if (currentPage === 1) {
      setIsDisabledLeft(true);
    } else {
      setIsDisabledLeft(false);
    }

    if (currentPage === quantityPages) {
      setIsDisabledRight(true);
    } else {
      setIsDisabledRight(false);
    }
  }, [currentPage]);

  return (
    <ul className="pagination" data-cy="pagination">
      <li className="pagination__item">
        {isDisabledLeft ? (
          <span className="pagination__link disabled">{'<'}</span>
        ) : (
          <SearchLink
            className="pagination__link"
            data-cy="paginationLeft"
            params={{ [SearchParams.PageNumber]: (currentPage - 1).toString() }}
            onClick={() => onSetCurrentPage(currentPage - 1)}
          >
            {'<'}
          </SearchLink>
        )}

      </li>

      {allPages.map(pageNumber => (
        <li
          key={`page-number-${pageNumber}`}
          className="pagination__item"
        >
          <SearchLink
            className={classNames(
              'pagination__link', { active: currentPage === pageNumber },
            )}
            params={{ [SearchParams.PageNumber]: pageNumber.toString() }}
            onClick={() => onSetCurrentPage(pageNumber)}
          >
            {pageNumber}
          </SearchLink>
        </li>
      ))}

      <li className="pagination__item">
        {isDisabledRight ? (
          <span className="pagination__link disabled">{'>'}</span>
        ) : (
          <SearchLink
            className="pagination__link"
            data-cy="paginationRight"
            params={{ [SearchParams.PageNumber]: (currentPage + 1).toString() }}
            onClick={() => onSetCurrentPage(currentPage + 1)}
          >
            {'>'}
          </SearchLink>
        )}
      </li>
    </ul>
  );
};
