import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenWidth } from '../../features/screenWidth';
import { RootState } from '../../app/store';
import styles from './header.module.scss';
import logoImage from '../../assets/images/Logo-header.png';
import { HeaderTablet } from './header-tablet/header-tablet';
import { HeaderMenu } from './header-menu';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const windowWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );
  const [isHeaderModalOpen, setIsHeaderModalOpen] =
    React.useState<boolean>(false);

  const toggleModal = () => {
    setIsHeaderModalOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isHeaderModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isHeaderModalOpen]);

  return (
    <>
      <h1>Product Catalog</h1>

      {windowWidth >= 640 ? (
        <HeaderTablet />
      ) : (
        <header className={styles.header}>
          <div className="container">
            <div className={styles.header_div}>
              <NavLink to="/">
                <img
                  src={logoImage}
                  alt="logo"
                  className={styles.header_logo}
                />
              </NavLink>
              <div className={styles.header_menu}>
                <button
                  className={classNames(styles.header_icon_open, {
                    [styles.header_icon_close]: isHeaderModalOpen,
                  })}
                  onClick={toggleModal}
                  aria-label="Open header menu"
                ></button>
              </div>
            </div>
          </div>
        </header>
      )}

      {isHeaderModalOpen && <HeaderMenu onClose={toggleModal} />}
    </>
  );
};
