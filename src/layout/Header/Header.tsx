import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { Nav } from '../../components/Nav';
import { Icon } from '../../components/Icon';
import styles from './Header.module.scss';
import { StateContext } from '../../utils/GlobalContext';
import { Link } from 'react-router-dom';

const MIN_TABLET_WIDTH = BREAKPOINTS['min-tablet'];

export const Header: React.FC = () => {
  const [burger, setBurger] = useState(false);
  const navList = ['home', 'phone', 'tablets', 'accessories'];
  const navPath = [`/`, 'phones', 'tablets', 'accessories'];
  const { favourites, cart } = useContext(StateContext);

  useEffect(() => {
    const setWidth = () => {
      if (window.innerWidth > MIN_TABLET_WIDTH) {
        setBurger(false);
      }
    };

    window.addEventListener('resize', setWidth);

    if (burger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('resize', setWidth);
      document.body.style.overflow = '';
    };
  }, [burger]);

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.header__container)}>
        <Link to={`/`} className={classNames(styles.header__logo)}>
          <img
            src={`${import.meta.env.BASE_URL}/img/logo.png`}
            alt="logo"
            className={classNames(styles['header__logo-img'])}
          />
        </Link>
        <div
          className={classNames(styles.header__content, {
            [styles['is-active']]: burger === true,
          })}
        >
          <div className={classNames(styles.header__nav)}>
            <Nav names={navList} targets={navPath} destination={'nav'} />
          </div>
          <div className={classNames(styles.header__icons)}>
            <Link
              to={'/favourites'}
              className={classNames(styles['header__icons--item'])}
            >
              <Icon
                path={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                name={'favourites'}
              />
              {favourites.length !== 0 && (
                <div
                  className={classNames(styles['header__icons--item--count'])}
                >
                  <span>{favourites.length}</span>
                </div>
              )}
            </Link>
            <Link
              to={'/cart'}
              className={classNames(styles['header__icons--item'])}
            >
              <Icon
                path={`${import.meta.env.BASE_URL}/img/icons/card.svg`}
                name={'card'}
              />
              {cart.length !== 0 && (
                <div
                  className={classNames(styles['header__icons--item--count'])}
                >
                  <span>{cart.length}</span>
                </div>
              )}
            </Link>
          </div>
        </div>
        <div
          className={classNames(styles.header__burger)}
          onClick={() => setBurger(!burger)}
        >
          <div className={classNames(styles['header__icons--item'])}>
            {!burger ? (
              <Icon
                path={`${import.meta.env.BASE_URL}/img/icons/burger.svg`}
                name={'burger'}
              />
            ) : (
              <Icon
                path={`${import.meta.env.BASE_URL}/img/icons/exit.svg`}
                name={'exit'}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
