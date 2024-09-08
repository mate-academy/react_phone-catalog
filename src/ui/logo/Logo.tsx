import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './logo.module.scss';

import logo from '/img/logo.svg';
import { ROUTES } from '@utils/constants/routes';

export const Logo: FC = () => (
  <Link to={ROUTES.HOME} className={styles.logo}>
    <img src={logo} alt="Goods Gadgets" width={80} height={32} />
  </Link>
);
