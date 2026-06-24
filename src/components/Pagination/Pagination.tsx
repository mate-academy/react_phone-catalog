import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import s from './Pagination.module.scss';

type Props = {
  pages: number;
  current?: number;
  type: 'light' | 'full';
  onPageClick?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  type,
  current,
  onPageClick = () => {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    type === 'light' ? current || 1 : +(searchParams.get('page') || 1);

  function handlePageChange(pageNum: number) {
    if (type === 'light') {
      onPageClick(pageNum);
    } else {
      const newPageNum = pageNum;

      const params = new URLSearchParams(searchParams);

      params.set('page', `${newPageNum}`);

      if (!newPageNum) {
        params.delete('perpage');
      }

      setSearchParams(params);
    }
  }

  return (
    <nav
      className={classNames(
        'pagination is-rounded mb-0',
        type === 'light'
          ? [`is-justify-content-flex-end is-relative ${s.relative_position}`]
          : 'is-justify-content-center',
      )}
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`pagination-previous p-0 ${s.pagination_light_theme} is-flex-grow-0`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {type === 'full' && (
        <ul className="pagination-list is-flex-grow-0">
          <li>
            <button
              className={classNames(`pagination-link ${s.pag_link}`, {
                [`is-current ${s.current}`]: page === 1,
              })}
              aria-label="Goto page 1"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
          </li>
          {page > 3 && (
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          )}
          {[...Array(3)].map(
            (_, i) =>
              page + i > 2 &&
              page + i < pages + 1 && (
                <li key={i}>
                  <button
                    className={classNames(`pagination-link ${s.pag_link}`, {
                      [`is-current ${s.current}`]: page === page - 1 + i,
                    })}
                    aria-label="Goto page 45"
                    onClick={() => handlePageChange(page - 1 + i)}
                  >
                    {page - 1 + i}
                  </button>
                </li>
              ),
          )}
          {page < pages - 2 && (
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          )}
          <li>
            <button
              className={classNames(`pagination-link ${s.pag_link}`, {
                [`is-current ${s.current}`]: page === pages,
              })}
              aria-label={`Goto page ${pages}`}
              onClick={() => handlePageChange(pages)}
            >
              {pages}
            </button>
          </li>
        </ul>
      )}
      <button
        className={`pagination-next p-0 is-flex-grow-0 ${s.pagination_light_theme_next}`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </nav>
  );
};
