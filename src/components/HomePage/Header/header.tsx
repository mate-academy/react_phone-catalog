import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import classNames from 'classnames';
import { useDevices } from '../../../context/DeviceProvider';

export const Header = () => {
  const { favoriteDevices } = useDevices();
  const { addedDevice } = useDevices();

  const isActiveButton = ({ isActive }: { isActive: boolean }) => {
    return isActive ? styles.header_buttoms_selected : '';
  };

  return (
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

      <div>
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
            <span className={styles.shoping}>{addedDevice.length}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
