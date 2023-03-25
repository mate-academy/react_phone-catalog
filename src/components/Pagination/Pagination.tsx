import './pagination.scss';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  pages: number[],
};

export const Pagination: React.FC<Props> = ({
  pages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPagesNumber = useCallback(() => {
    const getPage = searchParams.get('page');

    if (getPage) {
      return (+getPage - 1);
    }

    return 0;
  }, [pages]);

  const [isActive, setIsActive] = useState<number>(getPagesNumber());

  const setCurrentPageNumber = useCallback(() => {
    searchParams.set('page', `${isActive + 1}`);
    setSearchParams(searchParams);
  }, [isActive]);

  useEffect(() => {
    setIsActive(getPagesNumber());
  }, [pages]);

  useEffect(() => {
    setCurrentPageNumber();
  }, [isActive]);

  return (
    <article className="pagination">
      <button
        data-cy="paginationLeft"
        className="pagination__button"
        type="button"
        aria-label="previous page"
        onClick={() => setIsActive((prev) => prev - 1)}
        disabled={pages[0] === isActive}
      />

      <div className="pagination__container">
        <ul className="pagination__page-list">
          {pages.map((item: number) => (
            <li key={item} className="pagination__page">
              <button
                className={classNames('pagination__link',
                  { 'pagination__link--active': item === isActive })}
                type="button"
                onClick={() => setIsActive(item)}
              >
                {item + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="paginationRight"
        className="pagination__button pagination__button-next"
        type="button"
        aria-label="next page"
        onClick={() => setIsActive((prev) => prev + 1)}
        disabled={pages[pages.length - 1] === isActive}
      />
    </article>
  );
};
