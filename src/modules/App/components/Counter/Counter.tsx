import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Counter.module.scss';

type Props = {
  count: number;
};

export const Counter: React.FC<Props> = ({ count }) => {
  const [previousCount, setPreviousCount] = useState(count);
  const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null);

  useEffect(() => {
    if (count !== previousCount) {
      if (!count) {
        return;
      }

      if (!previousCount) {
        setIsIncreasing(null);
        setPreviousCount(count);

        return;
      }

      setIsIncreasing(count > previousCount);

      setTimeout(() => {
        setIsIncreasing(null);
        setPreviousCount(count);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div
      className={classNames(styles.counter, {
        [styles['counter--increase']]: isIncreasing,
        [styles['counter--decrease']]: isIncreasing === false,
        [styles['counter--empty']]: !count,
      })}
    >
      {isIncreasing !== null && (
        <span
          className={classNames(
            styles.counter__value,
            styles['counter__value--new'],
          )}
        >
          {count}
        </span>
      )}

      <span
        className={classNames(
          styles.counter__value,
          styles['counter__value--old'],
        )}
      >
        {previousCount}
      </span>
    </div>
  );
};
