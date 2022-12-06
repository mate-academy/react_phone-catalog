import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { updateSearch } from '../../helpers/updateSearch';
import { NavButton } from '../UI/NavButton';
import { getNumbers } from '../../helpers/getNumbers';

type Props = {
  currentPage: string;
  pagesCount: number;
};

export const Paginator:FC<Props> = (
  { currentPage, pagesCount },
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagesList = getNumbers(1, pagesCount);

  const prevPage = () => {
    if (+currentPage === 1) {
      return;
    }

    setSearchParams(
      updateSearch(
        searchParams,
        { page: `${+currentPage - 1}` },
      ),
    );
  };

  const nextPage = () => {
    if (+currentPage === pagesCount) {
      return;
    }

    setSearchParams(
      updateSearch(
        searchParams,
        { page: `${+currentPage + 1}` },
      ),
    );
  };

  return (
    <ul className="pagination">
      <li>
        <NavButton
          width="32px"
          height="32px"
          direction="prev"
          action={prevPage}
          isDisabled={+currentPage === 1}
        />
      </li>
      <ul className="pagination__pages">
        {pagesList.map(page => (
          <li key={page}>
            <Link
              to={{ search: updateSearch(searchParams, { page: `${page}` }) }}
              className={classNames(
                'pagination__page',
                { 'pagination__page--active': (page === +currentPage) },
              )}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
      <li>
        <NavButton
          width="32px"
          height="32px"
          direction="next"
          action={nextPage}
          isDisabled={+currentPage === pagesCount}
        />
      </li>
    </ul>
  );
};
