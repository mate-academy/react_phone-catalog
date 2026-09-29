import React from 'react';

import { ConnectionLostImg, NoWiFiImg } from '@/shared/assets/error-img';
import { ActionButton } from '../Buttons/components/ActionButton';

import cn from 'classnames';
import './FetchError.scss';

type Props = {
  type?: 'offline' | 'server';
  onRetry?: () => void;
  className?: string;
};
export const FetchError: React.FC<Props> = ({
  onRetry,
  type = 'server',
  className = '',
}) => {
  const isOffline = type === 'offline';

  return (
    <div className={cn('fetch-error', className)} role="alert">
      <h3 className="fetch-error__title">
        {isOffline ? 'No internet connection' : 'Something went wrong'}
      </h3>
      {isOffline ? (
        <NoWiFiImg className="fetch-error__image" />
      ) : (
        <ConnectionLostImg className="fetch-error__image" />
      )}

      <p className="fetch-error__text">
        {isOffline
          ? 'Please check your network connection and try again.'
          : 'Failed to load data from the server.'}
      </p>

      {onRetry && (
        <ActionButton
          className="fetch-error__button"
          onClick={onRetry}
          variant="secondary"
        >
          {isOffline ? 'Try again' : 'Reload page'}
        </ActionButton>
      )}
    </div>
  );
};
