import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  itemsNumber: number;
};

export const Pagination: React.FC<Props> = ({ itemsNumber }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('perPage');
  const currentPage = searchParams.get('page');

  const pagesArr = [];

  if (itemsPerPage) {
    const pagesNumber = Math.ceil(itemsNumber / +itemsPerPage);

    for (let i = 0; i < +pagesNumber; i++) {
      pagesArr.push(i + 1);
    }
  }

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleChandePage = (value: number) => {
    setSearchWith({ page: value.toString() });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (currentPage && +currentPage > 1) {
      setSearchWith({ page: (+currentPage - 1).toString() });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 0);
    }
  };

  const handleNext = () => {
    if (currentPage && +currentPage < pagesArr.length) {
      setSearchWith({ page: (+currentPage + 1).toString() });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 0);
    }
  };

  return (
    <div className="pagination">
      <button
        className={classNames(
          'pagination__button pagination--prev pagination__arrow',
          {
            _disabled: currentPage && +currentPage === 1,
          },
        )}
        disabled={currentPage === '1'}
        onClick={handlePrev}
      ></button>
      {pagesArr.length > 0 &&
        pagesArr.map((page, index) => (
          <button
            key={index}
            className={classNames('pagination__button', {
              _current: currentPage && +page === +currentPage,
            })}
            onClick={() => {
              handleChandePage(page);
            }}
          >
            {page}
          </button>
        ))}
      <button
        className={classNames(
          'pagination__button pagination--next pagination__arrow',
          {
            _disabled: currentPage === pagesArr.length.toString(),
          },
        )}
        disabled={currentPage === pagesArr.length.toString()}
        onClick={handleNext}
      ></button>
    </div>
  );
};
