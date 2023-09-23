import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PhonesPaginations.scss';

import { Phone } from '../../Type/Phone';

type Props = {
  phones: Phone[],
  currentPage: number,
  setCurrentPage: (v: number) => void;
};

export const PhonesPaginations: React.FC<Props> = ({
  phones, currentPage, setCurrentPage,
}) => {
  const [searchParams] = useSearchParams();
  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';

  const lengthPagination = Math.ceil(
    phones.length / +selectedValueNumberOptions,
  );

  const fieldValidation = (value: number) => {
    if (typeof NaN === 'number') {
      return +value;
    }

    return value;
  };

  const selectPrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const selectNext = () => {
    if (currentPage !== lengthPagination) {
      setCurrentPage(currentPage + 1);
    }
  };

  const preperaLength = fieldValidation(lengthPagination);

  const result = new Array(preperaLength)
    .fill(preperaLength).map((_, i) => i + 1);

  return (
    <>
      <button
        onClick={selectPrev}
        type="button"
        aria-label="Mute volume"
        className="pagination__button pagination__button--left"
      />
      {result.map(page => (
        <button
          type="button"
          aria-label="Mute volume"
          onClick={() => setCurrentPage(page)}
          className={classNames(
            'pagination__button pagination__button--pagination',
            { 'pagination__button-active': page === +currentPage },
          )}
          key={page}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Mute volume"
        onClick={selectNext}
        className="pagination__button pagination__button--right"
      />
    </>
  );
};
