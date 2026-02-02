import { NavLink, useLocation } from 'react-router-dom';
import style from './Footer.module.scss';
import { useLikeProducts } from '../../context/LikeCard';
import { useCard } from '../../context/CardContext';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const { count } = useLikeProducts();
  const { item } = useCard();

  const cartCount = item.length;
  const isAsidePage = pathname === '/aside';
  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={style.footer}>
      {isAsidePage ? (
        <div className={style.icon}>
          <div className={style.leftBorder}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${style.iconLeftHeart} ${style.iconLeftHeartActive}`
                  : style.iconLeftHeart
              }
            >
              <div className={style.iconLeft}>
                <img
                  src="img/buttons/empty_heart_button.svg"
                  alt="heart button"
                />

                {count > 0 && <span className={style.badge}>{count}</span>}
              </div>
            </NavLink>
          </div>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${style.iconRightBag} ${style.iconLeftHeartActive}`
                : style.iconRightBag
            }
          >
            <div className={style.iconRight}>
              <img
                src="img/buttons/shopping_bag_button.svg"
                alt="shopping bag button"
              />
              {cartCount > 0 && (
                <span className={style.badge}>{cartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      ) : (
        <>
          <div className={style.footerLogo}>
            <img src="img/logo/logo_for_footer.svg" alt="logo for footer" />
          </div>

          <div className={style.footerLinks}>
            <a
              className={style.footerLink}
              href="https://github.com/Mariiaantoniv/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              className={style.footerLink}
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
            <a
              className={style.footerLink}
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </div>

          <div className={style.footerToTop}>
            <p className={style.footerP}>Back to top</p>
            <button className={style.footerButton} onClick={goToTop}>
              <img
                src="img/buttons/slider_button_footer_right.svg"
                alt="button go to top"
              />
            </button>
          </div>
        </>
      )}
    </footer>
  );
};
