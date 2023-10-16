import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './PhonesPaginations.scss';

import { Phone } from '../../Type/Phone';

type Props = {
  phones: Phone[],
};

export const PhonesPaginations: React.FC<Props> = ({ phones }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValueNumberOptions = searchParams.get('NumberOptions') || '4';
  const selectedPage = searchParams.get('page') || '1';
  const lengthPagination = Math.ceil(
    phones.length / +selectedValueNumberOptions,
  );
  const fieldValidation = (value: number) => {
    if (typeof NaN === 'number') {
      return +value;
    }

    return value;
  };

  function handleChangeSetPage(page: string) {
    const params = new URLSearchParams(searchParams);

    params.set('page', page);
    setSearchParams(params);
  }

  function handleChangePrevPage(prevPage: string) {
    let newPrevPage;

    newPrevPage = +prevPage - 1;

    if (+prevPage <= 1) {
      newPrevPage = 1;
    }

    const params = new URLSearchParams(searchParams);

    params.set('page', newPrevPage.toString());
    setSearchParams(params);
  }

  function handleChangeNextPage(nextPage: string) {
    let newNextPage;

    newNextPage = +nextPage + 1;

    if (+nextPage >= lengthPagination) {
      newNextPage = +nextPage;
    }

    const params = new URLSearchParams(searchParams);

    params.set('page', newNextPage.toString());
    setSearchParams(params);
  }

  const preperaLength = fieldValidation(lengthPagination);
  const lengthArray = new Array(preperaLength)
    .fill(preperaLength).map((_, i) => i + 1);

  let preperaPagination = lengthArray
    .slice(+selectedPage - 3, +selectedPage + 2);

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
