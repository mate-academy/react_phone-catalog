import cn from 'classnames';
import { NumberPaginator } from './NumberPaginator/NumberPaginator.component';

type Props = {
  pageNumbers: number[];
  currentPage: number;
  onPageClick: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  pageNumbers,
  currentPage,
  onPageClick,
}) => {
  return (
    <div className="pagination">
      <a
        className="pagination__link"
        href="#prev"
        onClick={e => {
          e.preventDefault();
          onPageClick(currentPage - 1);
        }}
      >
        <div className={cn('pagination__item', 'pagination__item--prev')}>
          &lt;
        </div>
      </a>
      <NumberPaginator
        totalPages={pageNumbers.length}
        currentPage={currentPage}
        onPageClick={onPageClick}
      />
      <a
        className="pagination__link"
        href="#next"
        onClick={e => {
          e.preventDefault();
          onPageClick(currentPage + 1);
        }}
      >
        <div className={cn('pagination__item', 'pagination__item--next')}>
          &gt;
        </div>
      </a>
    </div>
  );
};
