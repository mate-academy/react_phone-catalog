import React from 'react';
import errorFallbackStyles from './ErrorFallback.module.scss';
import { ActionButton } from '../ActionButton';

export const ErrorFallback: React.FC = () => {
  return (
    <div className={errorFallbackStyles.errorFallback}>
      <h2 className={errorFallbackStyles.errorFallback__title}>
        Unable to Load Products
      </h2>
      <p className={errorFallbackStyles.errorFallback__text}>
        We couldn&apos;t load the products. Please try again or explore other
        options.
      </p>
      <ActionButton
        className={errorFallbackStyles.errorFallback__reloadButton}
        onClick={() => window.location.reload()}
      >
        Try again
      </ActionButton>
    </div>
  );
};
