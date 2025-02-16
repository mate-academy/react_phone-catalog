import classNames from 'classnames';
import React from 'react';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

import styles from './Counter.module.scss';

type Props = {
  count?: number;
  onAdd?: () => void;
  onTake?: () => void;

  showSkeleton?: boolean;
};

export const Counter: React.FC<Props> = ({
  count,

  onAdd = () => {},
  onTake = () => {},

  showSkeleton,
}) => {
  return (
    <div className={styles.counter}>
      <IconButton
        type={IconButtonType.iconMinus}
        disabled={showSkeleton}
        onClick={showSkeleton ? undefined : onTake}
      />

      <div className={styles.counter__wrapper}>
        <div
          className={classNames(styles.counter__count, {
            [styles['counter__count--skeleton']]: showSkeleton,
          })}
        >
          {showSkeleton ? <br /> : count}
        </div>
      </div>

      <IconButton
        type={IconButtonType.iconPlus}
        disabled={showSkeleton}
        onClick={showSkeleton ? undefined : onAdd}
      />
    </div>
  );
};
