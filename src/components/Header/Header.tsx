import { NavLink } from 'react-router-dom';
import { PageNavList } from '../PageNavList/PageNavList';

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="logo">
          LOGO
        </NavLink>
        <PageNavList />
      </nav>
      <div className="header__right-block">
        <div className="favorites right-block--prop">
          <NavLink to="/favorites" className="favorites__link icon" />
        </div>
        <div className="cart right-block--prop">
          <NavLink to="/cart" className="cart__link icon" />
        </div>
      </div>
    </header>
  );
};
