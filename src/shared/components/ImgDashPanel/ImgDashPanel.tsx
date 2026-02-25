import React from 'react';
import styles from './ImgDashPanel.module.scss';
import cn from 'classnames';

interface Props {
  item: React.ReactNode[];
  active: number;
  onClick: (i: number) => void;
  classNames?: string;
}

export const ImgDashPanel: React.FC<Props> = ({
  item,
  active,
  onClick,
  classNames,
}) => {
  return (
    <div className={`${styles.container} ${classNames}`}>
      {item.map((photo, i) => (
        <div
          key={`${photo}-${i}`}
          onClick={() => onClick(i)}
          className={cn(styles.block, { [styles.active]: i === active })}
        >
          <div className={styles.img}>{photo}</div>
        </div>
      ))}
    </div>
  );
};
