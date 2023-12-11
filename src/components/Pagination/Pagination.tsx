import React from 'react';
import { getNumbers } from '../../utils/utils';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfLinks = Math.ceil(total / perPage);
  const handleLinkClick = (link: number) => {
    if (link !== currentPage) {
      onPageChange(link);
    }
  };

  const handleClickToPrevious = (previousLink: number) => {
    if (currentPage !== 1) {
      onPageChange(previousLink);
    }
  };

  const handleClickToNext = (nextLink: number) => {
    if (currentPage !== numberOfLinks) {
      onPageChange(nextLink);
    }
  };

  return (
    <>
      <ul className="pagination" data-cy="pagination">
        <li className="page-item">
          <button
            data-cy="paginationLeft"
            type="button"
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handleClickToPrevious(currentPage - 1)}
          >
            <img
              src="_new/img/icons/arrowRight.svg"
              alt="arrowLeft"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </button>
        </li>

        {getNumbers(1, numberOfLinks).map((link) => (
          <li key={link} className="page-item">
            <button
              type="button"
              data-cy="pageLink"
              key={link}
              className={link === currentPage
                ? 'page-link active' : 'page-link'}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            data-cy="paginationRight"
            type="button"
            className="page-button"
            disabled={currentPage === numberOfLinks}
            onClick={() => handleClickToNext(currentPage + 1)}
          >
            <img
              src="_new/img/icons/arrowRight.svg"
              alt="arrowRight"
              style={{ transform: 'rotate(90deg)' }}
            />
          </button>
        </li>
      </ul>
    </>
  );
};
