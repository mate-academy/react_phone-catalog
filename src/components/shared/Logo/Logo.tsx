import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <>
      <Link className={styles.logo__link} to="/">
        {isSunSelected ? (
          <img
            src="img/headerIсons/Logoikon.svg"
            className={styles.logo__img}
            alt="logo"
          />
        ) : (
          <img
            src="img/headerIсons/dark-logo.svg"
            className={styles.logo__img}
            alt="logo"
          />
        )}
      </Link>
    </>
  );
};
