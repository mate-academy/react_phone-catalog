import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import logo from '/img/logo.svg';
import { ROUTES } from '@utils/constants/routes';

import styles from './logo.module.scss';

type TProps = {
  onClickAction: () => void;
};

const LogoComponent: FC<TProps> = ({ onClickAction }) => (
  <Link
    to={ROUTES.HOME}
    className={styles.logo}
    onClick={onClickAction}
    title="Home page"
  >
    <img src={logo} alt="Goods Gadgets" width={80} height={32} />
  </Link>
);

export const Logo = memo(LogoComponent);

Logo.displayName = 'Logo';
