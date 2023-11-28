import classnames from 'classnames';
// import { getSearchWith } from '../../utils/searchHelper';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './PaginationSearchParams.scss';
import ArrowRight from '../../images/icons/arrow_right_small.svg';
import ArrowLeftDisabled from '../../images/icons/arrow_left_disabled.svg';

type Props = {
  itemsPerPage: number,
  currentPage: number,
  countDatas: number,
  onPageChange: (number: number) => void,
};

export const PaginationSearchParams: React.FC<Props> = ({
  countDatas,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const perPage = searchParams.get('perPage') || dataLength;
  // const page = searchParams.get('page') || '1';

  const paginationRange = usePagination({
    currentPage,
    totalCount: countDatas,
    pageSize: itemsPerPage,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  const disabledLeft = currentPage === 1;
  const disabledRight = currentPage === lastPage;
  // const handlePageSelect = (pageNumber: number) => {
  //   const paramsToUpdate = { page: !pageNumber ? null : `${pageNumber}` };
  //   const newParams = getSearchWith(
  //     searchParams, {
  //       page: `${pageNumber}`,
  //     },
  //   );

  //   setSearchParams(getSearchWith(searchParams, paramsToUpdate));

  //   navigate({ search: newParams });
  // };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className="pagination pagination__container"
    >
      {/* Left navigation arrow */}
      <button
        type="button"
        className={classnames('pagination__btn', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        {disabledLeft ? (
          <img
            src={ArrowLeftDisabled}
            alt="arrow left"
            className="pagination__arrow"
          />
        ) : (
          <img
            src={ArrowRight}
            alt="arrow left"
            className="pagination__arrow pagination__arrow--left"
          />
        )}

      </button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li
              className="pagination__item pagination__dots"
              key={`${Math.random()}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <button
            key={pageNumber}
            type="button"
            className={classnames('pagination__item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        type="button"
        className={classnames('pagination__item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        {disabledRight ? (
          <img
            src={ArrowLeftDisabled}
            alt="arrow left"
            className="pagination__arrow pagination__arrow--left"
          />
        ) : (
          <img
            src={ArrowRight}
            alt="arrow left"
            className="pagination__arrow pagination__arrow--right"
          />
        )}

      </button>
    </ul>

  );
};
