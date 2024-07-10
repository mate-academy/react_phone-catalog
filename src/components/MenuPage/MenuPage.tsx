import { useContext, useEffect } from 'react';
import styles from './MenuPage.module.scss';
import { MenuContext } from '../../contexts/MenuContextProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { CartContext } from '../../contexts/CartContextProvider';
import { LikeContext } from '../../contexts/LikeContextProvider';

export const MenuPage = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);
  const { cartCards } = useContext(CartContext);
  const { likeCards } = useContext(LikeContext);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const getActive = (path: string) => {
    const pathFrom = pathname.split('/').filter(x => x)[0] || 'home';

    return path.toLowerCase() === pathFrom;
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <main
      className={classNames(styles.menu, { [styles.menu__active]: isOpen })}
    >
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <Link
            className={classNames(styles.menu__link, {
              [styles['menu__link--active']]: getActive('Home'),
            })}
            to={'/'}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Link
            className={classNames(styles.menu__link, {
              [styles['menu__link--active']]: getActive('Phones'),
            })}
            to={'/phones'}
            onClick={() => setIsOpen(false)}
          >
            Phones
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Link
            className={classNames(styles.menu__link, {
              [styles['menu__link--active']]: getActive('Tablets'),
            })}
            to={'/tablets'}
            onClick={() => setIsOpen(false)}
          >
            Tablets
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Link
            className={classNames(styles.menu__link, {
              [styles['menu__link--active']]: getActive('Accessories'),
            })}
            to={'/accessories'}
            onClick={() => setIsOpen(false)}
          >
            Accessories
          </Link>
        </li>
      </ul>

      <div className={styles.menu__sub}>
        <div
          className={styles.menu__like}
          onClick={() => {
            setIsOpen(false);
            navigate('/favourites', { state: pathname });
          }}
        >
          <div className={styles['menu__like-icon']}>
            {likeCards.length > 0 && (
              <div className={styles.menu__counter}>{likeCards.length}</div>
            )}
          </div>
        </div>

        <div className={styles.menu__cart}>
          <div
            className={styles['menu__cart-icon']}
            onClick={() => {
              setIsOpen(false);
              navigate('/cart', { state: pathname });
            }}
          >
            {cartCards.length > 0 && (
              <div className={styles.menu__counter}>{cartCards.length}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
