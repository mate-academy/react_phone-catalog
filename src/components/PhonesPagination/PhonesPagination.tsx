import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PhonesPagination.scss';

import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[];
};

export const PhonesPaginations: React.FC<Props> = ({ phones }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';

  const selectedPage = searchParams.get('page') || '1';

  const lengthPagination = Math.ceil(
    phones.length / +selectedValueNumberOptions,
  );

  function fieldValidation(value: number): number {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(value)) {
      return +value;
    }

    return 1;
  }

  function handleChangeSetPage(page: string) {
    const params = new URLSearchParams();

    params.set('page', page);
    setSearchParams(params);
  }

  function handleChangePrevPage(prevPage: string) {
    let newPrevPage = +prevPage - 1;

    if (newPrevPage < 1) {
      newPrevPage = 1;
    }

    const params = new URLSearchParams();

    params.set('page', newPrevPage.toString());
    setSearchParams(params);
  }

  function handleChangeNextPage(nextPage: string) {
    let newNextPage = +nextPage + 1;

    if (newNextPage > lengthPagination) {
      newNextPage = lengthPagination;
    }

    const params = new URLSearchParams();

    params.set('page', newNextPage.toString());
    setSearchParams(params);
  }

  const pageArray = Array.from(
    { length: fieldValidation(lengthPagination) },
    (_, i) => i + 1,
  );

  let preperaPagination = pageArray.slice(+selectedPage - 3, +selectedPage + 2);

  if (+selectedPage <= 3) {
    preperaPagination = [1, 2, 3, 4, 5];
  }

  return (
    <>
      <button
        onClick={() => handleChangePrevPage(selectedPage)}
        type="button"
        aria-label="Mute volume"
        className="pagination__button pagination__button--left"
      />
      {preperaPagination.map(page => (
        <button
          type="button"
          aria-label="Mute volume"
          onClick={() => {
            handleChangeSetPage(page.toString());
          }}
          className={classNames(
            'pagination__button pagination__button--pagination',
            { 'pagination__button-active': page === +selectedPage },
          )}
          key={page}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Mute volume"
        onClick={() => handleChangeNextPage(selectedPage)}
        className="pagination__button pagination__button--right"
      />
    </>
  );
};
