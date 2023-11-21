import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
  onPageChange: (item: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  /* eslint-disable no-plusplus */
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlenNextPage = () => {
    if (currentPage < pageNumbers.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames(
          'pagination__item',
          'pagination__left',
          'pagination__button', {
            disabled: currentPage === 1,
          },
        )}
        onClick={handlePrevPage}
        aria-disabled={currentPage === 1}
      />

      {pageNumbers.map((item) => (
        <button
          type="button"
          className={classNames(
            'pagination__item',
            'pagination__item--text', {
              'pagination__item--active': currentPage === item,
            },
          )}
          key={item}
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      ))}

      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames(
          'pagination__item',
          'pagination__right',
          'pagination__button', {
            disabled: currentPage === 1,
          },
        )}
        onClick={handlenNextPage}
        aria-disabled={currentPage === 1}
      />
    </div>
  );
};
