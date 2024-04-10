import { Link, NavLink } from 'react-router-dom';

// const getLinkClass = ({ isActive }: { isActive: boolean }) =>
//   classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Sidebar = () => {
  return (
    <aside className="sidebar" id="#menu">
      <Link to="/" className="sidebar__close-link icon-container">
        <img
          src="/img/icons/close.svg"
          alt="close"
          className="icon icon--close"
        />
      </Link>

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
        <NavLink to="favourites" className="sidebar__fav icon-container">
          <img
            src="/img/icons/favourites.svg"
            alt="favourites"
            className="icon icon--fav"
          />
        </NavLink>
        <NavLink to="shoping-cart" className="sidebar__cart icon-container">
          <img
            src="/img/icons/shopping-cart.svg"
            alt="cart"
            className="icon icon--cart"
          />
        </NavLink>
      </div>
    </aside>
  );
};
