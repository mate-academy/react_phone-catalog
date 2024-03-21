import React, { memo } from 'react';
import './Loader.scss';

type Props = {
  size?: 'small' | 'medium' | 'large';
};

export const Loader: React.FC<Props> = memo(({ size = 'medium' }) => {
  return (
    <div className="Loader" data-cy="loader">
      <div className={`Loader__content Loader__content--${size}`} />
    </div>
  );
});
