import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Gargets } from '../../interface/Gargets';
import { useEffect, useState, useCallback } from 'react';

interface Props {
  isMobile: boolean;
  links: string[];
  setClickOnLogoBar: React.Dispatch<React.SetStateAction<boolean>>;
  clickOnLogoBar: boolean;
  cartItems: Gargets[];
  favoriteItems: Gargets[];
}

export const NavBar: React.FC<Props> = ({
  isMobile,
  links,
  setClickOnLogoBar,
  clickOnLogoBar,
  cartItems,
  favoriteItems,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();

  const calculateTotal = useCallback(() => {
    const stored = localStorage.getItem('cartWithCount');
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Якщо в localStorage є дані з count, рахуємо їх
        // Але фільтруємо, щоб вони збігалися з тим, що реально є в контексті (cartItems)
        const contextIds = new Set(cartItems.map(i => i.id));
        const filtered = parsed.filter((item: any) => contextIds.has(item.id));
        
        const count = filtered.reduce((sum: number, item: any) => sum + (Number(item.count) || 1), 0);
        
        // Якщо в контексті є нові товари, яких ще немає в localStorage (щойно додані)
        // ми додаємо їхню кількість до загальної суми
        const storedIds = new Set(filtered.map((i: any) => i.id));
        const newlyAddedCount = cartItems.filter(i => !storedIds.has(i.id)).length;

        setTotalCount(count + newlyAddedCount);
      } catch {
        setTotalCount(cartItems.length);
      }
    } else {
      // Якщо localStorage порожній, просто беремо довжину масиву з контексту
      setTotalCount(cartItems.length);
    }
  }, [cartItems]); // Слідкуємо за cartItems!

  useEffect(() => {
    calculateTotal();
    
    // Слухаємо кастомну подію та стандартну
    window.addEventListener('cartUpdated', calculateTotal);
    window.addEventListener('storage', calculateTotal);
    
    return () => {
      window.removeEventListener('cartUpdated', calculateTotal);
      window.removeEventListener('storage', calculateTotal);
    };
  }, [calculateTotal]);

  useEffect(() => {
    setIsActive(
      location.pathname.includes(`/cart`) ||
      location.pathname.includes(`/favorites`),
    );
  }, [location]);

  return (
    <nav data-cy="nav" className="navbar is-fixed-top has-shadow" role="navigation">
      <ul className="navbar__brand">
        <NavLink
          className="navbar__link__logo"
          to={isMobile ? '/Menu' : '/'}
          onClick={e => { if (isMobile) e.preventDefault(); }}
        >
          <img src="./img/navbar/Logo.png" alt="logo-gadgets" />
        </NavLink>
        {links.map((item, index) => (
          <li className="navbar__item" key={index}>
            <NavLink
              className={({ isActive }) => classNames('navbar__link', { 'has-background-grey-lighter': isActive })}
              to={item === 'home' ? '/' : `/${item}`}
            >
              {item.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar__right">
        {['favorites', 'cart'].map(route => {
          const isCart = route === 'cart';
          const isFavorite = route === 'favorites';
          const isActiveLink = isActive && location.pathname.includes(`/${route}`);
          
          // cartItems.length — це реактивний стан, React оновить NavBar, 
          // як тільки addToCart спрацює в ProductList
          const badgeValue = isCart ? totalCount : favoriteItems.length;

          return (
            <button
              key={route}
              className={classNames('navbar__button', {
                hidden: !isMobile || clickOnLogoBar,
                'has-background-grey-lighter': isActiveLink,
              })}
            >
              <NavLink className={`navbar__icon__${isCart ? 'cart' : 'like'}`} to={`/${route}`}>
                {badgeValue > 0 && (
                  <span className="navbar__badge">{badgeValue}</span>
                )}
              </NavLink>
            </button>
          );
        })}
      </div>

      <div className="navbar__burger">
        {isMobile && (
          <button className="navbar__button-burger" onClick={() => setClickOnLogoBar(prev => !prev)}>
            <div className={clickOnLogoBar ? 'navbar__icon__close' : 'navbar__icon__menu'} />
          </button>
        )}
      </div>
    </nav>
  );
};