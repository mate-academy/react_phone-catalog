import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

import logoMobile from '../../asset/img/logo/Logo-mb.png';
import logoLaptop from '../../asset/img/logo/logo-laptop.png';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link to="/" className={classNames(styles.logo, className)}>
      <picture className={styles.logo__picture}>
        <source
          srcSet={logoLaptop}
          media="(min-width: 1200px)"
          type="image/png"
        />
        <img src={logoMobile} alt="logo" />
      </picture>
    </Link>
  );
};
