import classNames from 'classnames';
import { getNumbers } from '../../utils/getNumber';

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
  const handleSelectPage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const lastPage = Math.ceil(total / +perPage);
  const arrOfPages = getNumbers(1, lastPage);

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

        {arrOfPages.map((page, i) => {
          return (
            <li
              className={classNames('pagination__num', {
                'pagination__num--active': currentPage === i + 1,
                'pagination__num--inactive': currentPage !== i + 1,
              })}
              key={page}
            >
              <button
                type="button"
                data-cy="pageLink"
                className={classNames('pagination__num-link', {
                  'pagination__num-link--active': currentPage === i + 1,
                  'pagination__num-link--inactive': currentPage !== i + 1,
                })}
                onClick={() => handleSelectPage(i + 1)}
              >
                <span className="pagination__num-link--span">
                  {i + 1}
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
