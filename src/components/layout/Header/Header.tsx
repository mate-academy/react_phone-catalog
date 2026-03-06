import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  const [showBurger, setShowBurger] = useState<boolean>(false);

  useEffect(() => {
    if (showBurger) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [showBurger]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logo__link}>
            <img src="/icons/Logo.svg" alt="" className={styles.logo__img} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link to="/" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link to="/" className={styles.nav__link}>
                Phones
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link to="/" className={styles.nav__link}>
                Tablets
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link to="/" className={styles.nav__link}>
                Accessories
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.buttons}>
          <div className={classNames(styles.block, styles.block__hidden)}>
            <Link to="/" className={styles.block__link}>
              <img
                src="/icons/Favourites.svg"
                alt=""
                className={styles.block__img}
              />
            </Link>
          </div>
          <div className={classNames(styles.block, styles.block__hidden)}>
            <Link to="/" className={styles.block__link}>
              <img
                src="/icons/Shopping_Cart.svg"
                alt=""
                className={styles.block__img}
              />
            </Link>
          </div>
          <div className={classNames(styles.block, styles.block__burger)}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.active]: showBurger,
              })}
              onClick={() => setShowBurger(!showBurger)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(styles.menu, {
          [styles.menu__active]: showBurger,
        })}
      >
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__list_item}>
              <Link to="/" className={styles.menu__list_link}>
                <span className={styles.menu__list_text}>Home</span>
              </Link>
            </li>
            <li className={styles.menu__list_item}>
              <Link to="/" className={styles.menu__list_link}>
                <span className={styles.menu__list_text}>Phone</span>
              </Link>
            </li>
            <li className={styles.menu__list_item}>
              <Link to="/" className={styles.menu__list_link}>
                <span className={styles.menu__list_text}>Tablets</span>
              </Link>
            </li>
            <li className={styles.menu__list_item}>
              <Link to="/" className={styles.menu__list_link}>
                <span className={styles.menu__list_text}>Accessories</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.menu__footer}>
          <Link to="/" className={styles.menu__link}>
            <img
              src="/icons/Favourites.svg"
              alt=""
              className={styles.menu__img}
            />
          </Link>
          <Link to="/" className={styles.menu__link}>
            <img
              src="/icons/Shopping_Cart.svg"
              alt=""
              className={styles.menu__img}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
