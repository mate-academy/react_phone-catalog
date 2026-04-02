import React from 'react';
import style from './ErrorScreen.module.scss';

type Props = {
  title: string;
};

export const ErrorScreen: React.FC<Props> = ({ title }) => {
  return (
    <div className={style.error}>
      <h2 className={style.error__title}>{title}</h2>

      <img
        className={style.error__img}
        src="img/product-not-found.webp"
        alt="Error loading"
      />

      {title !== 'Product was not found' && (
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
