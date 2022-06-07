import classNames from 'classnames';
import React from 'react';
import './Pagination.scss';

type Props = {
  length: number;
  indexOfStart: number;
  numberOfItems: number;
  setIndexOfStart: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination: React.FC<Props> = ({
  length, indexOfStart, numberOfItems, setIndexOfStart,
}) => {
  return (
    <div className="pagination">
      <button
        type="button"
        className={classNames(
          'pagination-button',
          { 'pagination-button--is-disabled': indexOfStart === 0 },
        )}
        onClick={() => {
          setIndexOfStart(indexOfStart - 1);
        }}
      >
        <div className="icon-box pagination__icon-box">
          <span className={classNames(
            'icon',
            'icon--left',
            { 'icon--is-disabled': indexOfStart === 0 },
          )}
          />
        </div>
      </button>
      <button
        type="button"
        className={classNames(
          'pagination-button',
          {
            'pagination-button--is-disabled':
            indexOfStart === length - numberOfItems,
          },
        )}
        onClick={() => {
          setIndexOfStart(indexOfStart + 1);
        }}
      >
        <div className="icon-box pagination__icon-box">
          <span className={classNames(
            'icon',
            { 'icon--is-disabled': indexOfStart === length - numberOfItems },
          )}
          />
        </div>
      </button>
    </div>
  );
};
