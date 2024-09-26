import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import classNames from 'classnames';
import { useDevices } from '../../../context/DeviceProvider';
import { useEffect, useState } from 'react';

interface HeaderProps {
  countItems?: number;
}

export const Header: React.FC<HeaderProps> = ({ countItems }) => {
  const { favoriteDevices } = useDevices();
  const { addedDevice } = useDevices();
  const [isOpen, setIsOpen] = useState(false);
  const [hideOrShow, setHideOrShow] = useState({});

  const handleMenu = () => {
    setIsOpen(prev => !prev);

    if (isOpen) {
      setHideOrShow(() => {
        return {};
      });
    } else {
      setHideOrShow(() => {
        return { left: 0 };
      });
    }
  };

  const isActiveButton = ({ isActive }: { isActive: boolean }) => {
    return isActive ? styles.header_buttoms_selected : '';
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_buttoms_container}>
          <a href="">
            <img src="img/logo.png" alt="logo" className={styles.header_logo} />
          </a>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.header_buttoms, isActiveButton({ isActive }))
            }
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.header_buttoms, isActiveButton({ isActive }))
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.header_buttoms, isActiveButton({ isActive }))
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles.header_buttoms, isActiveButton({ isActive }))
            }
          >
            Accessories
          </NavLink>
        </div>

        <div className={styles.menu_shoping}>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              classNames(
                styles.header_buttoms_additional,
                isActive ? styles.header_buttoms_additional_selected : '',
              )
            }
          >
            <img src="img/Vector_heart.svg" alt="favorite logo" />
            {favoriteDevices.length > 0 && (
              <span className={styles.shoping}>{favoriteDevices.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/shoping"
            className={({ isActive }) =>
              classNames(
                styles.header_buttoms_additional,
                isActive ? styles.header_buttoms_additional_selected : '',
              )
            }
          >
            <img src="img/Shopping_bag.svg" alt="shoping logo" />
            {addedDevice.length > 0 && (
              <span className={styles.shoping}>
                {addedDevice.length + (countItems ?? 0)}
              </span>
            )}
          </NavLink>
        </div>

        <div className={styles.hamburgerContainer} onClick={handleMenu}>
          <div className={styles.hamburgerContainer_buttoms}>
            <div
              className={`${styles.bar1} ${isOpen ? styles.change : ''}`}
            ></div>
            <div
              className={`${styles.bar2} ${isOpen ? styles.change : ''}`}
            ></div>
            <div
              className={`${styles.bar3} ${isOpen ? styles.change : ''}`}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.menu} style={hideOrShow}>
        <div className={styles.menu_container}>
          <div className={styles.menu_buttons_container}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(styles.menu_buttons, isActiveButton({ isActive }))
              }
            >
              home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(styles.menu_buttons, isActiveButton({ isActive }))
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(styles.menu_buttons, isActiveButton({ isActive }))
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(styles.menu_buttons, isActiveButton({ isActive }))
              }
            >
              Accessories
            </NavLink>
          </div>
        </div>
        <div className={styles.menu_buttoms_additional_container}>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              classNames(
                styles.menu_buttoms_additional,
                isActive ? styles.menu_buttoms_additional_selected : '',
              )
            }
          >
            <img src="img/Vector_heart.svg" alt="favorite logo" />
            {favoriteDevices.length > 0 && (
              <span className={styles.shoping}>{favoriteDevices.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/shoping"
            className={({ isActive }) =>
              classNames(
                styles.menu_buttoms_additional,
                isActive ? styles.menu_buttoms_additional_selected : '',
              )
            }
          >
            <img src="img/Shopping_bag.svg" alt="shoping logo" />
            {addedDevice.length > 0 && (
              <span className={styles.shoping}>{addedDevice.length}</span>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
