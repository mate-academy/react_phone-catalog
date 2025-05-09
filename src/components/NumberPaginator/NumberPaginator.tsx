import classNames from 'classnames';

type Props = {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

export const NumberPaginator: React.FC<Props> = ({
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  const pages = [];
  let p = 1;

  function createLink(i: number) {
    const page = i;

    return (
      <button
        key={i}
        onClick={e => {
          e.preventDefault();
          handlePageChange(page);
        }}
        className={classNames('numberPaginator__number', {
          'numberPaginator__number--select': currentPage === page,
        })}
      >
        {page}
      </button>
    );
  }

  function createDots() {
    return (
      // eslint-disable-next-line max-len
      <div className="numberPaginator__number numberPaginator__number--disabled">
        ...
      </div>
    );
  }

  if (!totalPages) {
    return <div>No pages</div>;
  }

  if (totalPages < 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  while (p <= totalPages) {
    if (
      p <= 2 ||
      p >= totalPages - 2 ||
      (p >= currentPage - 1 && p <= currentPage + 1)
    ) {
      pages.push(createLink(p));
      p++;
    } else {
      pages.push(createDots());
      p = p < currentPage ? currentPage - 1 : totalPages - 2;
    }
  }

  return pages;
};
