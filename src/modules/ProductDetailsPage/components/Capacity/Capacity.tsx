import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Capacity.module.scss';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  itemId: string;
  capacity: string;
  active?: boolean;
};

export const Capacity: React.FC<Props> = ({ itemId, capacity, active }) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <li>
      <Link
        to={`../${itemId}`}
        className={classNames(styles.capacity, {
          [styles['capacity--active']]: active,
          [styles['capacity--dark']]: theme === Theme.dark,
        })}
      >
        {capacity}
      </Link>
    </li>
  );
};
