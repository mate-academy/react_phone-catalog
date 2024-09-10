import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type LogoProps = {
  placement: 'header' | 'footer';
};

export const Logo = ({ placement }: LogoProps) => {
  const linkStyle =
    placement === 'header'
      ? { width: '64px', height: '22px' }
      : { width: '89px', height: '32px' };

  return (
    <Link to="/" className={styles.logo} style={linkStyle}>
      <img
        src="/logo/logo-3x.png"
        alt="nice gadgets logo"
        className={styles.logo__img}
      />
    </Link>
  );
};
