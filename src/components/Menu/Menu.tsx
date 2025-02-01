import { NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import cn from 'classnames';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <aside className={`menu ${isOpen ? 'menu--open' : ''}`} id="menu">
      <div className="menu__top-bar">
        <div className="menu__top-bar__logo-block">
          <div className="menu__top-bar__logo-img"></div>
        </div>
        <div className="menu__top-bar__block-icons">
          <a
            href="#"
            className="menu__top-bar__link-icon"
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
          >
            <div className="icon--close icon"></div>
          </a>
        </div>
      </div>

      <Navigation
        modifiers="nav--aside"
        itemModifiers="nav__item--aside"
        onClose={onClose}
      />

      <div className="menu__bottom">
        <NavLink
          to="favourites"
          onClick={() => onClose()}
          className={({ isActive }) =>
            cn('menu__icon-link menu__icon-link--favourites', {
              'menu__icon-link--is-ative': isActive,
            })
          }
        >
          <div className="icon icon--fovourites"></div>
        </NavLink>

        <NavLink
          to="cart"
          onClick={() => onClose()}
          className={({ isActive }) =>
            cn('menu__icon-link menu__icon-link--cart', {
              'menu__icon-link--is-ative': isActive,
            })
          }
        >
          <div className="icon icon--cart"></div>
        </NavLink>
      </div>
    </aside>
  );
};
