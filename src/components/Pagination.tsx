import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  numberOfPages: number,
};

export const Pagination: React.FC<Props> = ({ numberOfPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('page') || 1;
  const [activePage, setActivePage] = useState(+active);
  const pages = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  const handlePagination = (value: string) => {
    const page = value;
    const perPage = searchParams.get('perPage') || '';
    const sort = searchParams.get('sort') || '';
    const query = searchParams.get('query') || '';

    if (!sort && !query) {
      setSearchParams({ page, perPage });
    } else if (sort && !query) {
      setSearchParams({ sort, page, perPage });
    } else if (!sort && query) {
      setSearchParams({ page, perPage, query });
    } else {
      setSearchParams({
        sort,
        page,
        perPage,
        query,
      });
    }
  };

  return (
    <>
      {pages.length !== 1 && (
        <div className="pagination pagination__phone">
          <ul className="pagination__list">
            <li key={0}>
              <button
                type="button"
                className={classNames('pagination__button pagination__button--prev',
                  { 'pagination__button--disabled': activePage === 1 })}
                onClick={() => {
                  setActivePage(activePage === 1 ? 1 : activePage - 1);
                  handlePagination((activePage - 1).toString());
                }}
              >
                { }
              </button>
            </li>
            {pages.map(page => (
              <li key={page}>
                <button
                  type="button"
                  className={classNames('pagination__button',
                    { 'pagination__button--active': page === activePage })}
                  onClick={() => {
                    setActivePage(page);
                    handlePagination(page.toString());
                  }}
                >
                  {page}
                </button>
              </li>
            ))}
            <li key={numberOfPages + 1}>
              <button
                type="button"
                className={classNames('pagination__button pagination__button--next',
                  { 'pagination__button--disabled': activePage === pages.length })}
                onClick={() => {
                  setActivePage(activePage === pages.length ? pages.length : activePage + 1);
                  handlePagination((activePage + 1).toString());
                }}
              >
                { }
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
