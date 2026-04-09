import React from 'react';
import style from './ErrorScreen.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  title: string;
};

export const ErrorScreen: React.FC<Props> = ({ title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isEmpty = title.includes('There are no products matching the query');

  return (
    <div className={style.error}>
      <h2 className={style.error__title}>{title}</h2>

      <img
        className={style.error__img}
        src="img/product-not-found.webp"
        alt="Error loading"
      />

      {isEmpty && (
        <button
          onClick={() =>
            setSearchParams(getSearchWith(searchParams, { query: null }))
          }
          className={style.error__button}
        >
          Clear Search
        </button>
      )}

      {title !== 'Product was not found' && !isEmpty && (
        <button
          onClick={() => window.location.reload()}
          className={style.error__button}
        >
          Retry Boot
        </button>
      )}
    </div>
  );
};
