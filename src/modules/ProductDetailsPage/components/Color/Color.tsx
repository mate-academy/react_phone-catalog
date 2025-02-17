import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Color.module.scss';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  itemId: string;
  color: string;
  active?: boolean;
};

export const Color: React.FC<Props> = ({ itemId, color, active }) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <li>
      <Link
        to={`../${itemId}`}
        aria-label={color}
        className={classNames(styles.color, {
          [styles['color--active']]: active,
          [styles['color--dark']]: theme === Theme.dark,
        })}
      >
        <div
          className={styles.color__content}
          style={{ backgroundColor: color.split(' ').at(-1) }}
        ></div>
      </Link>
    </li>
  );
};
