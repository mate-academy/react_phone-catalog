import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './logo.module.scss';
import { ROUTES } from '@utils/constants/routes';

export const Logo: FC = () => (
  <Link to={ROUTES.HOME} className={styles.logo}>
    <img src="/img/logo.svg" alt="Goods Gadgets" />
  </Link>
);
