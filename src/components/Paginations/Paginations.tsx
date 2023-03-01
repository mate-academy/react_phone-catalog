import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Paginations.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void,
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Paginations: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  const numberOfPages = Math.ceil(total / perPage);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="paginations">
      <ul className="paginations__list">
        <li className="paginations__item">
          <Link
            to="./"
            className="paginations__link"
            onClick={handlePrevPage}
          >
            {'<'}
          </Link>
        </li>

        {pages.map(item => (
          <li
            key={item}
            className="paginations__item"
          >
            <Link
              to="./"
              className={classNames(
                'paginations__link',
                {
                  'paginations__link--active': item === currentPage,
                },
              )}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Link>
          </li>
        ))}

        <li className="paginations__item">
          <Link
            to="./"
            className="paginations__link"
            onClick={handleNextPage}
          >
            {'>'}
          </Link>
        </li>
      </ul>
    </div>
  );
};
