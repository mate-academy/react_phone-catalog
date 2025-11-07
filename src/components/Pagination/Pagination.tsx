import style from './pagination.module.scss';
import arrowPrev from '@Images/icons/Arrow-left.svg';
import arrowNext from '@Images/icons/Arrow-right.svg';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/getSearch';

type Props = {
  total: number;
  perPage: number | string;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const PaginationPage = ({
  total,
  currentPage,
  perPage,
  onPageChange,
}: Props) => {
  let pageCount = 0;

  if (typeof perPage === 'number') {
    pageCount = Math.ceil(total / perPage);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      return onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      return onPageChange(currentPage + 1);
    }
  };

  const getPages = () => {
    const pagesToShow = [];

    const delta = 1;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pagesToShow.push(i);
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pagesToShow.push('...');
      }
    }

    return pagesToShow.filter(
      (item, idx, arr) => item !== '...' || arr[idx - 1] !== '...',
    );
  };

  const [searchParams] = useSearchParams();

  const getNextPageSearch = () => {
    if (currentPage >= pageCount) {
      return searchParams.toString();
    }

    const nextPageIndex = currentPage + 1;

    return getSearchWith({ page: nextPageIndex }, searchParams);
  };

  const getPrevPageSearch = () => {
    if (currentPage === 1) {
      return searchParams.toString();
    }

    const prevPageIndex = currentPage - 1;

    return getSearchWith({ page: prevPageIndex }, searchParams);
  };

  return (
    <>
      <ul className={style.pagination}>
        <li
          className={cn(style['page-item'], style['arrow-prev'], {
            [style.disabled]: currentPage === 1,
          })}
        >
          {' '}
          <Link
            className={style['page-link-arrow']}
            aria-disabled={currentPage === 1}
            to={{
              search: getPrevPageSearch(),
            }}
            onClick={() => {
              handlePrev();
            }}
          >
            <img src={arrowPrev} alt="" />
          </Link>
        </li>
        {getPages().map((el, i) => (
          <li
            className={cn(style['page-item'], {
              [style.active]: el === currentPage,
            })}
            key={i}
          >
            {el === '...' ? (
              <span>...</span>
            ) : (
              <Link
                className={style['page-link']}
                onClick={() => {
                  onPageChange(el as number);
                }}
                to={{
                  search: getSearchWith({ page: el }, searchParams),
                }}
              >
                {el}
              </Link>
            )}
          </li>
        ))}

        <li
          className={cn(style['page-item'], style['arrow-next'], {
            [style.disabled]: currentPage === pageCount,
          })}
        >
          <Link
            className={style['page-link-arrow']}
            aria-disabled={pageCount === currentPage}
            onClick={() => {
              handleNext();
            }}
            to={{
              search: getNextPageSearch(),
            }}
          >
            <img src={arrowNext} alt="" />
          </Link>
        </li>
      </ul>
    </>
  );
};
