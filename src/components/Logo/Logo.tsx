import styles from './Logo.module.scss';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../images/logo.svg';

type Props = {
  onLogoClick?: () => void;
  Footer?: boolean;
};

export const Logo: React.FC<Props> = ({ onLogoClick, Footer = false }) => {
  return (
    <Link to="/" className={styles.logo} onClick={onLogoClick}>
      <img
        src={logo}
        alt="logo"
        className={classNames(styles.logo__img, {
          [styles['logo__img--footer']]: Footer,
        })}
      />
    </Link>
  );
};
