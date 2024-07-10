import classNames from 'classnames';
import styles from './Navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../../contexts/MenuContextProvider';
import { LikeContext } from '../../contexts/LikeContextProvider';
import { CartContext } from '../../contexts/CartContextProvider';

export const Navbar = () => {
  const { pathname } = useLocation();

  const { isOpen, setIsOpen } = useContext(MenuContext);
  const { likeCards } = useContext(LikeContext);
  const { cartCards } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles['header__menu-logo-wrapper']}>
        <div
          className={styles['header__logo-wrapper']}
          onClick={() => navigate('/')}
        >
          <div className={styles.header__logo}>
            <div className={styles['header__logo-content']}></div>
          </div>
        </div>

        <ul className={styles['header__logo-ul']}>
          <li
            className={classNames(styles['header__logo-item'], {
              [styles['header__logo-item--active']]: pathname === '/',
            })}
          >
            <Link to="/" className={styles['header__logo-link']}>
              Home
            </Link>
          </li>

          <li
            className={classNames(styles['header__logo-item'], {
              [styles['header__logo-item--active']]: pathname === '/phones',
            })}
          >
            <Link to="/phones" className={styles['header__logo-link']}>
              Phones
            </Link>
          </li>

          <li
            className={classNames(styles['header__logo-item'], {
              [styles['header__logo-item--active']]: pathname === '/tablets',
            })}
          >
            <Link to="/tablets" className={styles['header__logo-link']}>
              Tablets
            </Link>
          </li>

          <li
            className={classNames(styles['header__logo-item'], {
              [styles['header__logo-item--active']]:
                pathname === '/accessories',
            })}
          >
            <Link to="/accessories" className={styles['header__logo-link']}>
              Accessories
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles['header__menu-container-wrapper']}>
        <div
          className={classNames(
            styles['header__menu-container'],
            styles['header__menu-container--burger'],
          )}
        >
          <div
            className={styles.header__menu}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={!isOpen ? styles.header__burger : styles.header__close}
            ></div>
          </div>
        </div>

        <div
          className={classNames(
            styles['header__menu-container'],
            styles['header__menu-container--like'],
            {
              [styles['header__menu-container--active']]:
                pathname === '/favourites',
            },
          )}
          onClick={() => navigate('/favourites')}
        >
          <div className={styles.header__menu}>
            <div className={styles.header__like}></div>

            {likeCards.length > 0 && (
              <div className={styles.header__counter}>{likeCards.length}</div>
            )}
          </div>
        </div>

        <div
          className={classNames(
            styles['header__menu-container'],
            styles['header__menu-container--cart'],
            {
              [styles['header__menu-container--active']]: pathname === '/cart',
            },
          )}
          onClick={() => navigate('/cart', { state: pathname })}
        >
          <div className={styles.header__menu}>
            <div className={styles.header__cart}></div>

            {cartCards.length > 0 && (
              <div className={styles.header__counter}>{cartCards.length}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
