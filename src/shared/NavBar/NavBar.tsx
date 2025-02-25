import React, { useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/WindowWidth';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
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
    const newIndex = links.findIndex(el =>
      location.pathname.includes(`/${el}`),
    );

    setLinkIndex(newIndex);
  }, [location]);

  useEffect(() => {
    if (windowWidth < 640) {
      setIsPhone(true);
    } else {
      setVisibleAside(false);
      setIsPhone(false);
    }
  }, [windowWidth]);

  return (
    <>
      <nav className={styles.navBar}>
        <a href="/home">
          <div className={styles.logo}>
            <img
              className={styles.logo__img}
              src={`${import.meta.env.BASE_URL}/img/icons/Logo.svg`}
              alt="Logo"
            />
          </div>
        </a>

        {isPhone ? (
          <>
            {/* #region Phone Navigation */}
            {visibleAside ? (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(false)}
                  className={styles.links__item}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/Close.svg`}
                    alt="close"
                  />
                </NavLink>
              </div>
            ) : (
              <div className={classNames(styles.icon, styles.rightButton)}>
                <NavLink
                  to="#"
                  onClick={() => setVisibleAside(true)}
                  className={styles.links__item}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/burgerMenu.svg`}
                    alt="menu"
                  />
                </NavLink>
              </div>
            )}
            {/* #region Phone Navigation */}
          </>
        ) : (
          <>
            {/* #region Tablet&PC Navigation */}
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
              <div
                className={styles.icon}
                style={{
                  border:
                    linkIndex === 'favourites' ? '3px solid black' : undefined,
                }}
              >
                <NavLink to="/favourites" className={styles.links__item}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                    alt="favourites"
                  />
                  {cartItems.length > 0 && (
                    <div className={classNames(styles.count, styles.cartCount)}>
                      {cartItems.length}
                    </div>
                  )}
                </NavLink>
              </div>

              <div className={styles.icon}>
                <NavLink to="/case" className={styles.links__item}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/case.svg`}
                    alt="case"
                  />
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
            {/* #endregion Tablet&PC Navigation */}
          </>
        )}
      </nav>

      {/* #region Aside */}
      <AnimatePresence>
        {visibleAside && (
          <motion.aside
            initial={{ transform: 'translateX(-100%)', opacity: '0' }}
            animate={{ transform: 'translateX(0%)', opacity: '1' }}
            exit={{ transform: 'translateX(-100%)', opacity: '0' }}
            className={classNames(styles.aside, {
              [styles['aside--visible']]: visibleAside,
            })}
          >
            <div className={styles.asideLinks}>
              <NavLink
                onClick={() => setVisibleAside(false)}
                className={styles.links__item}
                style={{
                  color: location.pathname.includes('home')
                    ? '#000'
                    : undefined,
                }}
                to={'/home'}
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisibleAside(false)}
                className={styles.links__item}
                style={{
                  color: location.pathname.includes('phones')
                    ? '#000'
                    : undefined,
                }}
                to={'/phones'}
              >
                PHONES
              </NavLink>
              <NavLink
                onClick={() => setVisibleAside(false)}
                className={styles.links__item}
                style={{
                  color: location.pathname.includes('tablets')
                    ? '#000'
                    : undefined,
                }}
                to={'/tablets'}
              >
                TABLETS
              </NavLink>
              <NavLink
                onClick={() => setVisibleAside(false)}
                className={styles.links__item}
                style={{
                  color: location.pathname.includes('accessories')
                    ? '#000'
                    : undefined,
                }}
                to={'/accessories'}
              >
                ACCESSORIES
              </NavLink>
            </div>

            <div className={styles.asideIcons}>
              <div
                className={styles.asideIcon}
                style={{
                  borderBottom: location.pathname.includes('favourites')
                    ? '3px solid black'
                    : 'none',
                }}
              >
                <NavLink to="/favourites" className={styles.links__item}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                    alt="favourites"
                  />
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

              <div
                className={styles.asideIcon}
                style={{
                  borderBottom: location.pathname.includes('case')
                    ? '3px solid black'
                    : 'none',
                }}
              >
                <NavLink to="/case" className={styles.links__item}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/icons/case.svg`}
                    alt="case"
                  />
                  {cartItems.length > 0 && (
                    <div className={classNames(styles.count, styles.cartCount)}>
                      {cartItems.length}
                    </div>
                  )}
                </NavLink>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* #endregion Aside */}
    </>
  );
};
