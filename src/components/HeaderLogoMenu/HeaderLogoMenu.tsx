import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
import { useMenu } from '../../context/MenuContext';

const HeaderLogoMenu: React.FC = () => {
  const { lovelyProducts, cartItems } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <div className={topBatStyles.header}>
      <div className={topBatStyles['top-bar']}>
        <div className={topBatStyles['top-bar__navigation__wrapper']}>
          <Link
            to="/"
            className={topBatStyles['top-bar__logo']}
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="../img/gadgets-logo.png"
              alt="img-logo"
              className={topBatStyles['top-bar__logo-img']}
            />
          </Link>

          <ul className={topBatStyles['top-bar__list']}>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={cn(topBatStyles['top-bar__link'], {
                  [topBatStyles['top-bar__link--current-page']]:
                    currentPath === '/',
                })}
                to="/"
              >
                home
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={cn(topBatStyles['top-bar__link'], {
                  [topBatStyles['top-bar__link--current-page']]:
                    currentPath === '/phones',
                })}
                to="/phones?quantity=16&sort=newest"
              >
                Phones
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={cn(topBatStyles['top-bar__link'], {
                  [topBatStyles['top-bar__link--current-page']]:
                    currentPath === '/tablets',
                })}
                to="/tablets?quantity=16&sort=newest"
              >
                tablets
              </Link>
            </li>
            <li className={topBatStyles['top-bar__item']}>
              <Link
                className={cn(topBatStyles['top-bar__link'], {
                  [topBatStyles['top-bar__link--current-page']]:
                    currentPath === '/accessories',
                })}
                to="/accessories?quantity=16&sort=newest"
              >
                accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className={topBatStyles['top-bar__icon-1']}>
          {isMenuOpen === true ? (
            <button
              className={`${iconStyles.icon} ${iconStyles['icon--close']}`}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></button>
          ) : (
            <button
              className={`${iconStyles.icon} ${iconStyles['icon--menu']}`}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></button>
          )}

          <div className={iconStyles['icon--heart__wrapper']}>
            <div
              className={cn(iconStyles['icon--heart__content'], {
                [iconStyles['icon--active']]: currentPath === '/favorites',
              })}
            >
              <Link
                to="/favorites"
                className={`${iconStyles['icon--heart']} ${iconStyles.icon}`}
              ></Link>
            </div>

            <span className={iconStyles.badge}>{lovelyProducts.length}</span>
          </div>

          <div className={iconStyles['icon--bag__wrapper']}>
            <div
              className={cn(iconStyles['icon--bag__content'], {
                [iconStyles['icon--active']]: currentPath === '/cart',
              })}
            >
              <Link
                to="/cart"
                className={`${iconStyles['icon--bag']} ${iconStyles.icon}`}
              ></Link>
            </div>

            <span className={iconStyles.badge}>{cartItems.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogoMenu;
