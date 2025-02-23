import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useStorage } from '../../context/StorageContext';

const links = ['home', 'phones', 'tablets', 'accessories'];

const ActiveLine = React.memo(() => (
  <motion.div
    layoutId="activeLine"
    style={{
      height: '5px',
      position: 'absolute',
      bottom: '-1px',
      width: 'calc(100% - 10px)',
      backgroundColor: '#000',
    }}
  />
));

ActiveLine.displayName = 'ActiveLine';

const LinkItem = React.memo(props => {
  const { item, isSelected, handleClick } = props;

  return (
    <motion.div
      initial={{ color: '#000' }}
      animate={{ color: isSelected ? 'rgb(255, 0, 0)' : '#000' }}
      style={{ height: '100%' }}
      onClick={handleClick}
    >
      <NavLink
        style={{
          textTransform: 'uppercase',
          color: isSelected ? '#000' : '#89939A',
        }}
        className={styles.links__item}
        to={`/${item}`}
      >
        {isSelected && <ActiveLine />}
        {item}
      </NavLink>
    </motion.div>
  );
});

LinkItem.displayName = 'LinkItem';

export default LinkItem;

export const NavBar: React.FC = () => {
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [visibleAside, setVisibleAside] = useState<boolean>(false);
  const [linkIndex, setLinkIndex] = useState<number>(0);
  const windowWidth = useWindowWidth();
  const { cartItems, favouritesItems } = useStorage();
  const location = useLocation();

  useEffect(() => {
    const newIndex = location.pathname
      .split('/')
      .find(el => links.includes(el));

    setLinkIndex(links.indexOf(newIndex || 'home'));
  }, [location]);

  useEffect(() => {
    if (windowWidth < 640) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, [windowWidth]);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <img
            className={styles.logo__img}
            src="/img/icons/Logo.svg"
            alt="Logo"
          />
        </div>

        {isPhone ? (
          <>
            {visibleAside ? (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(false)}
                  className={styles.links__item}
                >
                  <img src="/img/icons/Close.svg" alt="close" />
                </NavLink>
              </div>
            ) : (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(true)}
                  className={styles.links__item}
                >
                  <img src="/img/icons/burgerMenu.svg" alt="menu" />
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.links}>
              {links.map((item, itemIndex) => {
                return (
                  <LinkItem
                    key={item}
                    item={item}
                    isSelected={itemIndex === linkIndex}
                    handleClick={() => setLinkIndex(itemIndex)}
                  />
                );
              })}
            </div>
            <div className={styles.wrapper}>
              <div className={styles.icon}>
                <NavLink to="/favourites" className={styles.links__item}>
                  <img src="/img/icons/favourites.svg" alt="favourites" />
                  {cartItems.length > 0 && (
                    <div className={classNames(styles.count, styles.cartCount)}>
                      {cartItems.length}
                    </div>
                  )}
                </NavLink>
              </div>

              <div className={styles.icon}>
                <NavLink to="/case" className={styles.links__item}>
                  <img src="/img/icons/case.svg" alt="case" />
                  {favouritesItems.length > 0 && (
                    <div
                      className={classNames(
                        styles.count,
                        styles.favouritesCount,
                      )}
                    >
                      {favouritesItems.length}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </>
        )}
      </nav>

      {visibleAside && (
        <aside className={styles.aside}>
          <div className={styles.asideLinks}>
            <NavLink className={styles.links__item} to={'/'}>
              HOME
            </NavLink>
            <NavLink className={styles.links__item} to={'/phones'}>
              PHONES
            </NavLink>
            <NavLink className={styles.links__item} to={'/'}>
              TABLETS
            </NavLink>
            <NavLink className={styles.links__item} to={'/'}>
              ACCESSORIES
            </NavLink>
          </div>

          <div className={styles.asideIcons}>
            <div className={styles.asideIcon}>
              <NavLink to="/favourites" className={styles.links__item}>
                <img src="/img/icons/favourites.svg" alt="favourites" />
                {cartItems.length > 0 && (
                  <div className={styles.cartCount}>{cartItems.length}</div>
                )}
              </NavLink>
            </div>
            <div className={styles.asideIcon}>
              <NavLink to="/case" className={styles.links__item}>
                <img src="/img/icons/case.svg" alt="case" />
                {favouritesItems.length > 0 && (
                  <div className={styles.cartCount}>
                    {favouritesItems.length}
                  </div>
                )}
              </NavLink>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
