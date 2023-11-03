import React from 'react';
import Icons from '../../app/assets/images/sprite.svg';
import styles from './Icon.module.scss';

type Props = {
  id: string,
  className: string,
  count?: number | null,
};

export const Icon: React.FC<Props> = ({
  id,
  className,
  count,
}) => {
  return (
    count ? (
      <div className={styles.wrapper}>
        <span className={styles.total}>{count}</span>
        <svg className={className}>
          <use href={`${Icons}#icon-${id}`} />
        </svg>
      </div>
    ) : (
      <svg className={className}>
        <use href={`${Icons}#icon-${id}`} />
      </svg>
    )
  );
};

Icon.defaultProps = {
  count: null,
};
