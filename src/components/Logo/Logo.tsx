import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => (
  <Link to="/" className={classNames(`${className} ${styles.logo}`)}>
    <img
      src="img/logo.svg"
      alt="Nice Gadgets Logo"
      className={styles.logo__image}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  </Link>
);
