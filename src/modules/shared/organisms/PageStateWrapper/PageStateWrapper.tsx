import React from 'react';
import { PageLoader } from '../../molecules/PageLoader';
import { RetryErrorMessage } from '../RetryErrorMessage';

type AsyncState = {
  loading: boolean;
  error?: boolean;
};

type PageStateWrapperProps = {
  asyncStates: AsyncState[];
  fallback?: React.ReactNode;
  errorComponent?: React.ReactNode;
  children: React.ReactNode;
};

export const PageStateWrapper: React.FC<PageStateWrapperProps> = ({
  asyncStates,
  fallback = <PageLoader />,
  errorComponent = <RetryErrorMessage />,
  children,
}) => {
  const isLoading = asyncStates.some(state => state.loading);
  const hasError = asyncStates.some(state => state.error);

  if (isLoading) {
    return fallback;
  }
  if (hasError) {
    return errorComponent;
  }

  return <>{children}</>;
};
