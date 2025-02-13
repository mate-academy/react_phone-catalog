import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Color.module.scss';

type Props = {
  itemId: string;
  color: string;
  active?: boolean;
};

export const Color: React.FC<Props> = ({ itemId, color, active }) => {
  return (
    <Link
      to={`../${itemId}`}
      className={classNames(styles.color, {
        [styles['color--active']]: active,
      })}
    >
      <div
        className={styles.color__content}
        style={{ backgroundColor: color.split(' ').at(-1) }}
      ></div>
    </Link>
  );
};
