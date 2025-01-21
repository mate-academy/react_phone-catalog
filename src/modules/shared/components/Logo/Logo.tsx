import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type Props = {
  footer?: boolean;
};

export const Logo: React.FC<Props> = ({ footer = false }) => (
  <Link to="/" className={styles.logo}>
    <img
      src="./images/logo.png"
      alt="logo"
      className={classNames(styles.logo__image, {
        [styles['logo__image--footer']]: footer,
      })}
    />
  </Link>
);
