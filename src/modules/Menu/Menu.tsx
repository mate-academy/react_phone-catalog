import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const onClickClose = () => {
    dispatch({ type: 'toggleMenu' });
  };

  return (
    <aside className={styles.menu} id="menu">
      <div className={styles.container}>
        <div className={styles.menu__center}>
          <nav className={styles.menu__nav}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <a
                  className={styles.menu__link}
                  href="#shop"
                  onClick={onClickClose}
                >
                  Home
                </a>
              </li>

              <li className={styles.menu__item}>
                <a
                  className={styles.menu__link}
                  href="#contacts"
                  onClick={onClickClose}
                >
                  Phones
                </a>
              </li>
              <li className={styles.menu__item}>
                <a
                  className={styles.menu__link}
                  href="#about"
                  onClick={onClickClose}
                >
                  Tablets
                </a>
              </li>
              <li className={styles.menu__item}>
                <a
                  className={styles.menu__link}
                  href="#about"
                  onClick={onClickClose}
                >
                  Accessories
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.menu__bottom}>
        <div className={styles.menu__icons}>
          <Link
            className={classNames(styles.icon, [styles['icon-favourite']])}
            to="/favourites"
            onClick={onClickClose}
          >
            {!!favourites.length && (
              <span className={styles.icon__num}>{favourites.length}</span>
            )}
          </Link>
        </div>
        <div className={styles.menu__icons}>
          <Link
            className={classNames(styles.icon, [styles['icon-cart']])}
            to="/cart"
            onClick={onClickClose}
          >
            {!!cart.length && (
              <span className={styles.icon__num}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};
