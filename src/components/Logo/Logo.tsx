import { Link } from 'react-router-dom';

import okHand from '../../assets/logo-ok-hand.png';
import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks';
import { LogoIcon } from './LogoIcon';
import styles from './Logo.module.scss';

export const Logo = () => {
  const t = useTranslation();

  return (
    <Link
      className={styles.logo}
      to={ROUTES.home}
      aria-label={t.header.logoHome}
    >
      <span className={styles.inner}>
        <LogoIcon className={styles.icon} />

        <img className={styles.hand} src={okHand} alt="" aria-hidden="true" />
      </span>
    </Link>
  );
};
