import cn from 'classnames';

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
      <div className="pagination__numbers">
        {pageNumbers.map((page: number, index: number) => (
          <a
            key={index}
            className={cn('pagination__link', {
              'pagination__link--active pagination__item--active':
                currentPage === page,
            })}
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              onPageClick(page);
            }}
          >
            <div className="pagination__item">{page}</div>
          </a>
        ))}
      </div>
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
