import cn from 'classnames';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
};

export const NumberPaginator: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageClick,
}) => {
  const pagination = [];
  let p = 1;

  function createLink(i: number) {
    const page = i;

    return (
      <a
        key={i}
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
    );
  }

  function createDots() {
    return <div className="pagination__link pagination__item">...</div>;
  }

  if (!totalPages) {
    return <div>No pages</div>;
  }

  if (totalPages < 7) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(createLink(i));
    }

    return pagination;
  }

  while (p <= totalPages) {
    if (
      p <= 2 ||
      p >= totalPages - 2 ||
      (p >= currentPage - 1 && p <= currentPage + 1)
    ) {
      pagination.push(createLink(p));
      p++;
    } else {
      pagination.push(createDots());
      p = p < currentPage ? currentPage - 1 : totalPages - 2;
    }
  }

  return pagination;
};
