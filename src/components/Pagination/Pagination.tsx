import classNames from 'classnames';
import React from 'react';
import './Pagination.scss';

interface Props {
  countItems: number;
  itemOnPage: number;
  page: number;
  handlePage: (value: number) => void;
}

const Pagination: React.FC<Props> = (
  {
    countItems,
    itemOnPage,
    page,
    handlePage,
  },
) => {
  const arrPages
    = new Array(Math.ceil(countItems / itemOnPage))
      .fill('').map((btn, ind) => btn + ind);

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { innerHTML } = event.currentTarget;

    handlePage(+innerHTML);
  };

  const goToLeft = () => {
    handlePage(page - 1);
  };

  const goToRight = () => {
    handlePage(page + 1);
  };

  return (
    <div>
      <nav className="pagination">
        <div className="pagination__container">
          <ul className="pagination__list">

            <li className="pagination__item">
              <button
                className="pagination__btn"
                type="button"
                onClick={goToLeft}
                disabled={page === 1}
              >
                &laquo;
              </button>
            </li>
            <div className="pagination__item-container">
              {arrPages.map((btn, index) => {
                return (
                  <li
                    className="pagination__item"
                    key={btn}
                  >
                    <button
                      className={classNames(
                        'pagination__btn',
                        { 'pagination__btn--act': page === index + 1 },
                      )}
                      type="button"
                      onClick={(event) => {
                        onPageChange(event);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}
            </div>

            <li className="pagination__item">
              <button
                className="pagination__btn"
                type="button"
                onClick={goToRight}
                disabled={page === arrPages.length}
              >
                &raquo;
              </button>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
