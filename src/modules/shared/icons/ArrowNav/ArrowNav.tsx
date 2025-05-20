import React from 'react';
import styles from './ArrowNav.module.scss';
import { ArrowIconLeft, ArrowIconRight } from '../ArrowIcon/ArrowIcon';

export enum Direction {
  Left = 'left',
  Right = 'right',
}

type Props = {
  direction: Direction;
  classname: string;
  disabled?: boolean;
};

export const ArrowNav: React.FC<Props> = ({
  direction,
  classname,
  disabled,
}) => {
  switch (direction) {
    case Direction.Left:
      return (
        <button className={`${styles.arrow} ${classname}`} disabled={disabled}>
          <ArrowIconLeft />
        </button>
      );
    case Direction.Right:
      return (
        <button className={`${styles.arrow} ${classname}`} disabled={disabled}>
          <ArrowIconRight />
        </button>
      );
  }
};

export default ArrowNav;
