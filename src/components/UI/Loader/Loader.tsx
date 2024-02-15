import React, { memo } from 'react';
import './Loader.scss';

interface Props {
  size?: number,
  className?: string,
}

export const Loader: React.FC<Props> = memo(({ size, className }) => (
  <div className={`Loader ${className}`} data-cy="Loader">
    <div className="Loader__content" style={{ width: `${size}px` }} />
  </div>
));
