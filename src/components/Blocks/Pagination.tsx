import React from 'react';
import classNames from 'classnames';
import { IconSlideLeft, IconSlideRight } from '../../utils/Icons';

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  buttons: number[];
}

const Pagination: React.FC<Props> = ({
  currentPage, setCurrentPage, buttons,
}) => {
  return (
    <div className="section-catalog__pagination" data-cy="pagination">
      <button
        className="slider-button"
        type="button"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          window.scrollTo(0, 270);
        }}
        data-cy="paginationLeft"
      >
        <IconSlideLeft
          color={currentPage === 1 ? '#B4BDC4' : '#313237'}
        />
      </button>

      <div className="section-catalog__pagination--wrapper">
        {buttons.map(button => (
          <button
            key={button}
            type="button"
            onClick={() => {
              setCurrentPage(button);
              window.scrollTo(0, 270);
            }}
            className={`page-button${classNames({ ' button-is-active': currentPage === button })}`}
          >
            {button}
          </button>
        ))}
      </div>

      <button
        className="slider-button"
        type="button"
        disabled={currentPage === buttons.length}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo(0, 270);
        }}
        data-cy="paginationRight"
      >
        <IconSlideRight
          color={currentPage === buttons.length ? '#B4BDC4' : '#313237'}
        />
      </button>
    </div>
  );
};

export default Pagination;
