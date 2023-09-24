import classNames from 'classnames';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / +perPage);
  const pagesToShow = 2;
  const startPage = Math.max(1, currentPage - pagesToShow);
  const endPage = Math.min(lastPage, currentPage + pagesToShow);

  const handleSelectPage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const handleClickRight = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleClickLeft = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const leftDisabled = currentPage === 1;
  const rightDisabled = currentPage === lastPage;
  const arrOfItems = Array.from({ length: endPage - startPage + 1 },
    (_, i) => startPage + i);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={classNames('pagination__left',
          { 'pagination__left--disabled': leftDisabled })}
        >
          <button
            type="button"
            data-cy="paginationLeft"
            className="pagination__btn"
            aria-disabled="true"
            onClick={handleClickLeft}
          >
            <span className={classNames('arrow arrow--left', {
              'arrow--left-disabled': leftDisabled,
            })}
            />
          </button>
        </li>

        {arrOfItems.map((page) => {
          return (
            <li
              className={classNames('pagination__num', {
                'pagination__num--active': currentPage === page,
                'pagination__num--inactive': currentPage !== page,
              })}
              key={page}
            >
              <button
                type="button"
                data-cy="pageLink"
                className={classNames('pagination__num-link', {
                  'pagination__num-link--active': currentPage === page,
                  'pagination__num-link--inactive': currentPage !== page,
                })}
                onClick={() => handleSelectPage(page)}
              >
                <span className="pagination__num-link--span">
                  {page}
                </span>
              </button>
            </li>
          );
        })}

        <li className={classNames('pagination__rigth',
          { 'pagination__rigth--disabled': rightDisabled })}
        >
          <button
            type="button"
            data-cy="paginationRight"
            className="pagination__btn"
            aria-disabled="false"
            onClick={handleClickRight}
          >
            <span className={classNames('arrow arrow--right', {
              'arrow--right-disabled': rightDisabled,
            })}
            />
          </button>
        </li>
      </ul>
    </div>

  );
};
