import React from 'react';
import styles from './CounterIcon.module.scss';
import { useAppSelector } from '../../store/hooks';
import cn from 'classnames';

type Props = {
  counter: number;
};

export const CounterIcon: React.FC<Props> = ({ counter }) => {
  const { isDark } = useAppSelector(state => state.theme);

  return (
    counter > 0 && (
      <span
        className={cn(styles.counter, {
          [styles['counter--dark']]: isDark,
        })}
      >
        {counter > 99 ? '99+' : counter}
      </span>
    )
  );
};
