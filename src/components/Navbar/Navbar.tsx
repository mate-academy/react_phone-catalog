import { Link } from 'react-router-dom';
import './Navbar.scss';
import { MyNavLink } from '../UI/MyNavLink';
import { setScrollState } from '../../helpers/pageHelper';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link
        to="#side-menu"
        className="navbar__mobile"
        onClick={() => setScrollState('hidden')}
      />

      <div className="navbar__main">
        <MyNavLink to="/"> Home </MyNavLink>
        <MyNavLink to="/phones"> Phones </MyNavLink>
        <MyNavLink to="/tablets"> Tablets </MyNavLink>
        <MyNavLink to="/accessories"> Accessories </MyNavLink>
      </div>
    </nav>
  );
};
