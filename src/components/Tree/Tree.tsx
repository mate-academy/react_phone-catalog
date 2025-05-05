import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Tree.module.scss';
import homeLogo from '../../assets/Icons/Home.svg';
import arrowRight from '../../assets/Icons/Arrow-right.svg';
import { UseHooks } from '../../AppHooks';

export const Tree = () => {
  const { currentDevice, setCurrentDevice } = UseHooks();
  const { pathname } = useLocation();

  const currentCategory = pathname.split('/')[1];
  const clearCurDevice = () => setCurrentDevice(null);

  return (
    <div className={styles.tree}>
      <Link className={styles.tree__linkHome} to={'/home'}>
        <img
          className={styles.tree__home}
          src={homeLogo}
          alt="home"
          onClick={clearCurDevice}
        />
      </Link>
      <img className={styles.tree__arrow} src={arrowRight} alt="arrowRight" />
      {currentCategory && (
        <Link
          className={classNames(
            styles.tree__placeLink,
            {
              [styles['tree__placeLink--active']]: !currentDevice,
            },
            'small-text',
          )}
          to={`/${currentCategory}`}
          onClick={clearCurDevice}
        >
          <p>
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </p>
        </Link>
      )}
      {currentDevice && (
        <>
          <img
            className={styles.tree__arrow}
            src={arrowRight}
            alt="arrowRight"
          />
          <p className={classNames(styles.tree__name, 'small-text')}>
            {currentDevice.name}
          </p>
        </>
      )}
    </div>
  );
};
