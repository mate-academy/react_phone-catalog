import { LinkButton } from '../Button';
import { usePaginate } from '../../../store/PaginationContext';
import { Directions, IconId } from '../../../types/icons';
import style from './Pagination.module.scss';

export const Pagination = () => {
  const paginate = usePaginate();

  return (
    <ul className={style.pagination}>
      <LinkButton
        iconId={IconId.Chevron}
        directions={Directions.Left}
        to={paginate.getUrlWith(paginate.currentPage - 1)}
        aria-disabled={paginate.currentPage === 1}
        className={paginate.currentPage === 1 ? style.disabled : ''}
      />
      <div className={style.numsWrapper}>
        {paginate.visiblePages.map((page, i) =>
          typeof page === 'number' ? (
            <LinkButton
              key={i}
              to={paginate.getUrlWith(page)}
              onClick={() => paginate.onPageChange(page)}
              className={
                paginate.currentPage === page
                  ? style.activeNumber
                  : style.pageNumbers
              }
            >
              {page}
            </LinkButton>
          ) : (
            <span key={i}>...</span>
          ),
        )}
      </div>
      <LinkButton
        iconId={IconId.Chevron}
        directions={Directions.Right}
        to={
          paginate.currentPage >= paginate.totalPageCount
            ? ''
            : paginate.getUrlWith(paginate.currentPage + 1)
        }
        aria-disabled={paginate.currentPage >= paginate.totalPageCount}
        className={
          paginate.currentPage >= paginate.totalPageCount ? style.disabled : ''
        }
      />
    </ul>
  );
};
