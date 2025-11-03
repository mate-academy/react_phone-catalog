import style from './pagination.module.scss';
import arrowPrev from '@Images/icons/Arrow-left.svg';
import arrowNext from '@Images/icons/Arrow-right.svg';
import cn from 'classnames';

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

  return (
    <>
      <ul className={style.pagination}>
        <li
          className={cn(style['page-item'], style['arrow-prev'], {
            [style.disabled]: currentPage === 1,
          })}
        >
          {' '}
          <a
            className={style['page-link-arrow']}
            aria-disabled={currentPage === 1}
            href="#prev"
            onClick={e => {
              e.preventDefault();
              handlePrev();
            }}
          >
            <img src={arrowPrev} alt="" />
          </a>
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
              <a
                className={style['page-link']}
                onClick={() => onPageChange(el as number)}
                href="#"
              >
                {el}
              </a>
            )}
          </li>
        ))}

        <li
          className={cn(style['page-item'], style['arrow-next'], {
            [style.disabled]: currentPage === pageCount,
          })}
        >
          <a
            className={style['page-link-arrow']}
            href="#next"
            aria-disabled={pageCount === currentPage}
            onClick={e => {
              e.preventDefault();
              handleNext();
            }}
          >
            <img src={arrowNext} alt="" />
          </a>
        </li>
      </ul>
    </>
  );
};
