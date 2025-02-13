import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Capacity.module.scss';

type Props = {
  itemId: string;
  capacity: string;
  active?: boolean;
};

export const Capacity: React.FC<Props> = ({ itemId, capacity, active }) => {
  return (
    <Link
      to={`../${itemId}`}
      className={classNames(styles.capacity, {
        [styles['capacity--active']]: active,
      })}
    >
      {capacity}
    </Link>
  );
};
