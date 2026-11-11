import React from 'react';

import styles from './Pagination.module.scss';

type Props = {
  total: number;
  activeIndex: number;
  onChange: (index: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  activeIndex,
  onChange,
}) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.pagination__button} ${index === activeIndex ? styles['pagination__button--active'] : ''}`}
          onClick={() => onChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? 'true' : undefined}
        />
      ))}
    </div>
  );
};
