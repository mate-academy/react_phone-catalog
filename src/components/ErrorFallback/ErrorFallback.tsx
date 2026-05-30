import React from 'react';
import errorFallbackStyles from './ErrorFallback.module.scss';
import { TextButton } from '../TextButton';
import { useLoading } from '../../context/LoadingContext';

type Props = {
  onRetry: () => void;
};

export const ErrorFallback: React.FC<Props> = ({ onRetry }) => {
  const { isLoading } = useLoading();

  return (
    <div className={errorFallbackStyles.errorFallback}>
      <h2 className={errorFallbackStyles.errorFallback__title}>
        Unable to Load Products
      </h2>
      <p className={errorFallbackStyles.errorFallback__text}>
        We couldn&apos;t load the products. Please try again or explore other
        options.
      </p>
      <TextButton
        className={errorFallbackStyles.errorFallback__reloadButton}
        onClick={onRetry}
        disabled={isLoading}
      >
        Try again
      </TextButton>
    </div>
  );
};
