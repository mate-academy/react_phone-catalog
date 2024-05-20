import cn from 'classnames';
import './Pagination.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  pagesTotal: number;
  // currentPage: number;
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  pagesTotal,
  // currentPage,
  // setCurrentPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [pagesList, setPagesList] = useState<number[]>([]);
  const [visiblePages, setVisiblePages] = useState<number[]>(
    pagesList.slice(0, 4),
  );

  // - Save pagination params in the URL `?page=2&perPage=8` (`page=1` and `perPage=all` are the default values and should not be added to the URL;
  //  - Hide pagination elements if they do not make sense;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');

    if (page !== null) {
      setCurrentPage(+page);
    }
  }, [searchParams]);

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
        className={cn('pagination__arrow', 'arrow-left', {
          'arrow-left--active': currentPage > 1,
        })}
        onClick={() => {
          const page = searchParams.get('page');

          if (page && +page > 1) {
            searchParams.set('page', (+page - 1).toString());
            setSearchParams(searchParams);
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
            className={cn('pagination__page', {
              'pagination__page--active': currentPage === page,
            })}
            onClick={() => {
              searchParams.set('page', page.toString());
              setSearchParams(searchParams);
            }}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          className={cn('pagination__arrow', {
            'pagination__arrow--active': currentPage < pagesTotal,
          })}
          onClick={() => {
            const page = searchParams.get('page');

            if (page && +page > 1) {
              searchParams.set('page', (+page + 1).toString());
              setSearchParams(searchParams);
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
