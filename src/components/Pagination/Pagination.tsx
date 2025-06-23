import classNames from 'classnames';
import { SearchLink } from '../../store/SearchLink';
import React from 'react';

type Props = {
  currentPage: number;
  itemsOnPage: number;
  totalItems: number;
  onChange: (newPage: number) => {};
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsOnPage,
  totalItems,
  onChange,
}) => {
  const countPage = Math.ceil(totalItems / itemsOnPage);

  const renderPagination = () => {
    const numbers = [];

    for (let i = 1; i < countPage; i++) {
      if (
        i === 1 ||
        i === countPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        numbers.push(i);
      }
    }

    return (
      <>
        {numbers.map(num => (
          <SearchLink params={onChange(num)} key={num}>
            <button
              className={classNames(
                'pagination__button',
                'pagination__button--main',
                {
                  currentPage: currentPage === num,
                  last: num === Math.ceil(totalItems / itemsOnPage),
                },
              )}
            >
              {num}
            </button>
          </SearchLink>
        ))}
      </>
    );
  };

  return (
    <div className="pagination">
      <SearchLink params={onChange(currentPage - 1)}>
        <button
          className="pagination__button pagination__button--prev"
          disabled={currentPage === 1}
        ></button>
      </SearchLink>

      {renderPagination()}

      <SearchLink params={onChange(currentPage + 1)}>
        <button
          className="pagination__button pagination__button--next"
          disabled={currentPage >= countPage}
        ></button>
      </SearchLink>
    </div>
  );
};
