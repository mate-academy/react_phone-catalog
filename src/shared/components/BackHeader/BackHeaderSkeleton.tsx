import React from 'react';
import './BackHeaderSkeleton.scss';

type Props = {
  className?: string;
};

export const BackHeaderSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <div
      className={`back-header-skeleton ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="back-header-skeleton__btn" />
      <div className="back-header-skeleton__title-group">
        <div
          className="
            back-header-skeleton__title
            back-header-skeleton__title--main
            "
        />
        <div
          className="
            back-header-skeleton__title
            back-header-skeleton__title--sub
            "
        />
      </div>
    </div>
  );
};
