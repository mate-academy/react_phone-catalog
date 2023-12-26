import React from 'react';
import './Loader.scss';

type Props = {
  height?: number,
};

export const Loader: React.FC<Props> = ({
  height = 100,
}) => (
  <div className="Loader" data-cy="loader">
    <div
      className="Loader__content"
      style={{
        height: `${height}px`,
        width: `${height}px`,
      }}
    />
  </div>
);
