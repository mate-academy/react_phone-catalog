import classNames from 'classnames';
import styles from './logo.module.scss';
import { Link } from 'react-router-dom';

type LogoProps = {
  withPaddingLeft?: boolean;
};

export const Logo = ({ withPaddingLeft = false }: LogoProps) => (
  <Link
    to="/"
    className={classNames(styles.logo, {
      [styles['logo--padding-left']]: withPaddingLeft,
    })}
  >
    <img
      src="./img/logo/Logo-mobile.png"
      alt="Nice-gadgets-logo"
      className={styles.logoImg}
    />
  </Link>
);
