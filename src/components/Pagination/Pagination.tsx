import { useEffect } from 'react';
import cn from 'classnames';
import { v4 as unId } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

import { SearchLink } from '../../helpers/searchLink';
import { moveToTop } from '../../helpers/moveToTop';

import PaginationButt from './PaginationButt/PaginationButt';

type Props = {
  pages: number;
};

const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    moveToTop();
  }, [page]);

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <PaginationButt
          img="./icons/left.svg"
          move={+page - 1}
          isDis={+page === 1}
          data-cy="paginationLeft"
        />
      </li>
      {Array.from({ length: pages }).map((_, i) => (
        <li key={unId()} className="pagination__item">
          <SearchLink
            className={cn(
              'pagination__link',
              { 'pagination__link-active': i + 1 === +page },
            )}
            params={{ page: `${i + 1}` }}
          >
            {i + 1}
          </SearchLink>
        </li>
      ))}
      <li className="pagination__item">
        <PaginationButt
          img="./icons/right.svg"
          move={+page + 1}
          isDis={+page === pages}
          data-cy="paginationRight"
        />
      </li>
    </ul>
  );
};

export default Pagination;
