import { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '/img/logo.svg';
import { ROUTES } from '@utils/constants/routes';

import styles from './logo.module.scss';

type TProps = {
  closeMenu?: () => void;
};

export const Logo: FC<TProps> = ({ closeMenu }) => (
  <Link to={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
    <img src={logo} alt="Goods Gadgets" width={80} height={32} />
  </Link>
);
