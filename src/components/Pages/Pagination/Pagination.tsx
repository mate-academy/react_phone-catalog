import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';
import { Link } from 'react-router-dom';
import { Images } from '../../../images';
import * as Types from '../../../types';

type Props = {
  data: Types.PaginationData;
  functions: Types.PaginationFunctions;
};

export const Pagination: React.FC<Props> = ({ data, functions }) => {
  const { pages, currentPage, pagesCount, translate } = data;
  const { handlePageChange, handlePrevClick, handleNextClick } = functions;

  return (
    <article className="pagination">
      <Link
        className={classNames('button', {
          button__disabled: currentPage === 1,
        })}
        to={{
          search: handlePageChange(currentPage - 1),
        }}
        onClick={handlePrevClick}
      >
        <img
          src={Images.Button.Slider}
          alt="slider-button"
          className="button__image-rotate"
        />
      </Link>

      <ul
        className={classNames('pagination__pageBlock', {
          'pagination__pageBlock--fix': pagesCount < 5,
        })}
      >
        {pages.map(page => (
          <Link
            key={page}
            to={{
              search: handlePageChange(page),
            }}
            className={classNames('button button__page body-text', {
              'button__page--active': page === currentPage,
            })}
            style={{ transform: `translateX(${translate}px)` }}
          >
            {page}
          </Link>
        ))}
      </ul>

      <Link
        className={classNames('button', {
          button__disabled: currentPage === pagesCount,
        })}
        to={{
          search: handlePageChange(currentPage + 1),
        }}
        onClick={handleNextClick}
      >
        <img src={Images.Button.Slider} alt="slider-button" />
      </Link>
    </article>
  );
};
