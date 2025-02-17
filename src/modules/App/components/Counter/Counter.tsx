import React from 'react';
import classNames from 'classnames';
import styles from './Counter.module.scss';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <div
      className={classNames(styles.counter, {
        [styles['counter--empty']]: !count,
        [styles['counter--dark']]: theme === Theme.dark,
      })}
    >
      {count}
    </div>
  );
};
