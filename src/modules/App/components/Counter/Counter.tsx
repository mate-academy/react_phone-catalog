import React from 'react';
import classNames from 'classnames';
import styles from './Counter.module.scss';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  return (
    <div
      className={classNames(styles.counter, {
        [styles['counter--empty']]: !count,
      })}
    >
      {count}
    </div>
  );
};
