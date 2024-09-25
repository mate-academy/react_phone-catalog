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
  const { isSunSelected, isLiked, isGoods, totalItems } =
    useContext(GlobalContext);

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
            <>
              <img
                className={styles.ToolbarIcons__favorites_img}
                src="img/headerIсons/heart.svg"
                alt="heart"
              />
              {isLiked.length > 0 ? (
                <span className={styles.ToolbarIcons__favorites_length}>
                  {isLiked.length}
                </span>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              <img
                className={styles.ToolbarIcons__favorites_img}
                src="img/headerIсons/heart-dark.svg"
                alt="heart"
              />
              {isLiked.length > 0 ? (
                <span className={styles.ToolbarIcons__favorites_length_dark}>
                  {isLiked.length}
                </span>
              ) : (
                ''
              )}
            </>
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
            <>
              <img
                className={styles.ToolbarIcons__cart_img}
                src="img/headerIсons/cartIcon.svg"
                alt="cart"
              />
              {isGoods.length > 0 ? (
                <span className={styles.ToolbarIcons__cart_length}>
                  {totalItems}
                </span>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              <img
                className={styles.ToolbarIcons__cart_img}
                src="img/headerIсons/cart-dark.svg"
                alt="cart"
              />
              {isGoods.length > 0 ? (
                <span className={styles.ToolbarIcons__cart_length_dark}>
                  {totalItems}
                </span>
              ) : (
                ''
              )}
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};
