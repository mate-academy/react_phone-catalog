import { Link, NavLink } from 'react-router-dom';

// const getLinkClass = ({ isActive }: { isActive: boolean }) =>
//   classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Sidebar = () => {
  return (
    <aside className="sidebar" id="#menu">
      <div className="icon-wrapper icon-wrapper--close">
        <Link to="/" className="sidebar__close-link">
          <img
            src="/img/icons/close.svg"
            alt="close"
            className="icon icon--close"
          />
        </Link>
      </div>

      <div className="sidebar__nav">
        <div className="sidebar__nav-item">
          <NavLink to="/" className="quaternary-title">
            Home
          </NavLink>
        </div>
        <div className="sidebar__nav-item">
          <NavLink to="phones" className="quaternary-title">
            Phones
          </NavLink>
        </div>
        <div className="sidebar__nav-item">
          <NavLink to="tablets" className="quaternary-title">
            Tablets
          </NavLink>
        </div>
        <div className="sidebar__nav-item">
          <NavLink to="accessories" className="quaternary-title">
            Accessories
          </NavLink>
        </div>
      </div>

      <div className="sidebar__fav-and-cart">
        <div className="icon-wrapper">
          <NavLink to="favourites" className="Sidebar__fav">
            <img src="/img/icons/favourites.svg" alt="favourites" />
          </NavLink>
        </div>
        <div className="icon-wrapper icon-wrapper--right">
          <NavLink to="shoping-cart" className="Sidebar__cart">
            <img src="/img/icons/shopping-cart.svg" alt="cart" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
