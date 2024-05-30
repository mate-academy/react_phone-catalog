import classNames from 'classnames';
import { DOTS } from '../../constants';
import classes from './Pagination.module.scss';

export type Props = {
  range: (string | number)[];
  currentPage: number;
  changePage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  range,
  currentPage,
  changePage,
}) => {
  const lastPage = range[range.length - 1];
  const generateKey = (i: number) => `${i}_${new Date().getTime()}`;

  const handleSetPage = (page: string | number) => {
    if (typeof page === 'string') {
      return;
    }

    changePage(page);
  };

  return (
    <div className={classes.Pagination} data-cy="pagination">
      <button
        type="button"
        className={classNames(
          classes.Pagination__button,
          classes['Pagination__button--move'],
        )}
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        data-cy="paginationLeft"
      >
        <img
          src={`img/icons/Chevron-Left${currentPage === 1 ? '-disabled' : ''}.svg`}
          alt="Prev"
        />
      </button>

      <div className={classes.Pagination__pages}>
        {range.map((item, i) => {
          return item === DOTS ? (
            <div
              key={generateKey(i)}
              className={classNames(classes.Pagination__dots)}
            >
              &#8230;
            </div>
          ) : (
            <button
              key={item}
              type="button"
              className={classNames(
                classes.Pagination__button,
                classes['Pagination__button--page'],
                {
                  [classes['Pagination__button--page--active']]:
                    item === currentPage,
                },
              )}
              onClick={() => handleSetPage(item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={classNames(
          classes.Pagination__button,
          classes['Pagination__button--move'],
        )}
        disabled={currentPage === lastPage}
        onClick={() => changePage(currentPage + 1)}
        data-cy="paginationRight"
      >
        <img
          src={`img/icons/Chevron-Right${currentPage === lastPage ? '-disabled' : ''}.svg`}
          alt="Prev"
        />
      </button>
    </div>
  );
};
