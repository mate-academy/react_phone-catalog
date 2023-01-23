import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  function list(num: number): number[] {
    const arr = [];

    for (let i = 1; i <= num; i += 1) {
      arr.push(i);
    }

    return arr;
  }

  const correctList = list(Math.ceil(total / perPage));
  const firstItem = correctList[0];
  const lastItem = correctList[correctList.length - 1];

  function plus(num :number) {
    if (num === lastItem) {
      return lastItem;
    }

    return onPageChange(currentPage + 1);
  }

  function minus(num :number) {
    if (num === firstItem) {
      return firstItem;
    }

    return onPageChange(currentPage - 1);
  }

  function last() {
    onPageChange(lastItem);
  }

  function first() {
    onPageChange(firstItem);
  }

  const index = correctList.indexOf(currentPage);

  function getPagin() {
    switch (index) {
      case 0:
        return correctList.slice(0, index + 4);

      case 1:
        return correctList.slice(0, index + 3);

      case correctList.length - 2:
        return correctList.slice(index - 2, index + 2);

      case correctList.length - 1:
        return correctList.slice(index - 3);

      default:
        break;
    }

    if (index <= correctList.length - 3) {
      return correctList.slice(index - 1, index + 3);
    }

    return correctList;
  }

  const listOfPagin = getPagin();

  return (
    <div className="pagination">
      <button
        className="pagination_button"
        type="button"
        disabled={firstItem === currentPage}
        onClick={() => {
          first();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {'|<'}
      </button>

      <button
        className="pagination_button"
        type="button"
        onClick={() => {
          minus(currentPage);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {'<'}
      </button>

      {(correctList.length > 6 && index >= 2) && (
        <span className="pagination_span">
          ...
        </span>
      )}

      <div className="pagination_conteiner">
        {listOfPagin && listOfPagin.map(item => (
          <button
            key={item}
            className={classNames(
              'pagination_button pagination_conteiner_item', {
                'button-active': item === currentPage,
              },
            )}
            type="button"
            onClick={() => {
              onPageChange(item);
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {(correctList.length > 6 && index < correctList.length - 3) && (
        <span className="pagination_span">
          ...
        </span>
      )}

      <button
        className="pagination_button"
        type="button"
        onClick={() => {
          plus(currentPage);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {'>'}
      </button>

      <button
        className="pagination_button"
        type="button"
        disabled={lastItem === currentPage}
        onClick={() => {
          last();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {'>|'}
      </button>
    </div>
  );
};
