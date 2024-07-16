import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './ToolBar.module.scss';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { useContext } from 'react';

type Props = {
  isOpenMenu: boolean;
};

export const ToolBar: React.FC<Props> = ({ isOpenMenu }) => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div
      className={styles.ToolbarIcons}
      style={isOpenMenu ? { display: 'flex' } : { display: '' }}
    >
      <div className={styles.swither}>
        <ThemeSwitcher />
      </div>

      <div>
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.ToolbarIcons__favorites, {
              [styles['ToolbarIcons__favorites-active']]: isActive,
              [styles['ToolbarIcons__favorites-dark']]: !isSunSelected,
              [styles['ToolbarIcons__favorites-dark-active']]:
                !isSunSelected && isActive,
            })
          }
          to="/favourites"
        >
          {isSunSelected ? (
            <img
              className={styles.ToolbarIcons__favorites_img}
              src="img/headerIсons/heart.svg"
              alt="heart"
            />
          ) : (
            <img
              className={styles.ToolbarIcons__favorites_img}
              src="img/headerIсons/heart-dark.svg"
              alt="heart"
            />
          )}
        </NavLink>
        <NavLink
          className={({ isActive }: { isActive: boolean }) =>
            classNames(styles.ToolbarIcons__cart, {
              [styles['ToolbarIcons__cart-active']]: isActive,
              [styles['ToolbarIcons__cart-dark']]: !isSunSelected,
              [styles['ToolbarIcons__cart-dark-active']]:
                !isSunSelected && isActive,
            })
          }
          to="/cart"
        >
          {isSunSelected ? (
            <img
              className={styles.ToolbarIcons__cart_img}
              src="img/headerIсons/cartIcon.svg"
              alt="cart"
            />
          ) : (
            <img
              className={styles.ToolbarIcons__cart_img}
              src="img/headerIсons/cart-dark.svg"
              alt="cart"
            />
          )}
        </NavLink>
      </div>
    </div>
  );
};
