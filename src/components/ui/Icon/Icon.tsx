import React from 'react';
import sprite from '../../../assets/img/icons/icons.svg';
import styles from './Icon.module.scss';

type IconProps = {
  iconName: string;
  badgeInfo?: number | string;
};

const Badge: React.FC<{ badgeInfo: number | string }> = ({ badgeInfo }) => (
  <div className={styles.icon__badge}>
    <div className={styles['icon__badge-outer']}>
      <div className={styles['icon__badge-inner']}>{badgeInfo}</div>
    </div>
  </div>
);

export const Icon: React.FC<IconProps> = ({ iconName, badgeInfo = '' }) => {
  return (
    <>
      <svg className={styles.icon} aria-hidden="true">
        <use xlinkHref={`${sprite}#icon-${iconName}`} />
      </svg>
      {badgeInfo && <Badge badgeInfo={badgeInfo} />}
    </>
  );
};
