import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { v4 as unId } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

import { SearchLink } from '../../helpers/searchLink';
import { moveToTop } from '../../helpers/moveToTop';
import PaginationButt from './PaginationButt/PaginationButt';

const linkClasses = (cond: boolean) => cn(
  'button-block pagination__link',
  { active: cond },
);

type Props = {
  pages: number;
};

const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const arrayPage = useMemo(() => {
    return Array.from({ length: pages }).map((_, i) => i + 1);
  }, [pages]);
  const [minPag, setMinPage] = useState(0);
  const [maxPag, setMaxPage] = useState(5);
  const visiblePags = useMemo(() => {
    if (arrayPage.length <= 5) {
      return arrayPage;
    }

    return arrayPage.slice(minPag, maxPag);
  }, [arrayPage, minPag, maxPag]);

  useEffect(() => {
    moveToTop();

    if (visiblePags[0] === +page && +page !== 1) {
      setMinPage(currMinPage => currMinPage - 1);
      setMaxPage(currMaxPage => currMaxPage - 1);
    } else if (visiblePags[visiblePags.length - 1] === +page
        && +page !== arrayPage[arrayPage.length - 1]) {
      setMinPage(currMinPage => currMinPage + 1);
      setMaxPage(currMaxPage => currMaxPage + 1);
    }
  }, [page]);

  if (!pages) {
    return null;
  }

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
      {visiblePags.map(num => (
        <li key={unId()} className="pagination__item">
          <SearchLink
            className={linkClasses(num === +page)}
            params={{ page: `${num}` }}
          >
            {num}
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
