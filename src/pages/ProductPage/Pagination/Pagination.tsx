import classNames from 'classnames';
import './Pagination.scss';
import { useEffect, useState } from 'react';

type Props = {
  pagesTotal: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  pagesTotal,
  currentPage,
  setCurrentPage,
}) => {
  const [pagesList, setPagesList] = useState<number[]>([]);
  const [visiblePages, setVisiblePages] = useState<number[]>(
    pagesList.slice(0, 4),
  );

  useEffect(() => {
    const pages = [];

    for (let i = 1; i <= pagesTotal; i++) {
      pages.push(i);
    }

    setPagesList(pages);
  }, [pagesTotal]);

  useEffect(() => {
    // Change visible pages every time pagesList changes
    setVisiblePages(pagesList.slice(0, 4));
    setCurrentPage(1);
  }, [pagesList, setCurrentPage]);

  useEffect(() => {
    if (!visiblePages.includes(currentPage)) {
      setVisiblePages(pagesList.slice(currentPage - 1, currentPage + 3));
    }
  }, [currentPage, pagesList, visiblePages]);

  return (
    <ul className="pagination">
      <button
        className={classNames('pagination__arrow', 'arrow-left', {
          'arrow-left--active': currentPage > 1,
        })}
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((page: number) => page - 1);
          }
        }}
      >
        <img
          src={
            currentPage > 1
              ? './icons/arrow-left.svg'
              : './icons/arrow-left-disabled.svg'
          }
          alt="right arrow icon"
        />
      </button>

      {visiblePages.map((page: number) => (
        <li key={page}>
          <button
            className={classNames('pagination__page', {
              'pagination__page--active': currentPage === page,
            })}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          className={classNames('pagination__arrow', {
            'pagination__arrow--active': currentPage < pagesTotal,
          })}
          onClick={() => {
            if (currentPage < pagesTotal) {
              setCurrentPage((page: number) => page + 1);
            }
          }}
        >
          <img
            src={
              currentPage < pagesTotal
                ? './icons/arrow-right.svg'
                : './icons/arrow-right-disabled.svg'
            }
            alt="right arrow icon"
          />
        </button>
      </li>
    </ul>
  );
};
