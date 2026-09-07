import React from 'react';
import styles from './Error.module.scss';
import { ErrorMessage } from '../../../types/ErrorMessage';
import PageNotFound from '../../../../public/img/page-not-found.png';
import ProductNotFound from '../../../../public/img/product-not-found.png';

type Props = {
  errorMessage: ErrorMessage;
  onReload?: () => void;
};

function getErrorImage(errorText: ErrorMessage): string | null {
  switch (errorText) {
    case ErrorMessage.NotFoundAccessories:
    case ErrorMessage.NotFoundPhones:
    case ErrorMessage.NotFoundTablets:
    case ErrorMessage.NotFoundProduct:
      return ProductNotFound;

    case ErrorMessage.PageNotFound:
      return PageNotFound;

    default:
      return null;
  }
}

export const Error: React.FC<Props> = ({ errorMessage, onReload }) => {
  const img = getErrorImage(errorMessage);

  return (
    <div className={styles.Error}>
      <h1 className={styles.Error__title}>{errorMessage}</h1>

      {onReload && (
        <button className={styles.Error__reloadBtn} onClick={onReload}>
          Reload
        </button>
      )}

      {img && (
        <div
          className={styles.Error__img}
          style={{ backgroundImage: img }}
        ></div>
      )}
    </div>
  );
};
