import React from 'react';
import counter from './Counter.module.scss';

type Props = {
  icon: string;
  count?: number;
  alt: string;
};

export const Counter: React.FC<Props> = ({ icon, count = 0, alt }) => {
  return (
    <div className={counter.counter}>
      {count > 0 && (
        <div className={counter.counter__ellipse}>
          <div className={counter.counter__ellipse__container}>
            <span className={counter.counter__ellipse__container__number}>
              {count}
            </span>
          </div>
        </div>
      )}

      <img src={icon} alt={alt} className={counter.counter__icon} />
    </div>
  );
};
