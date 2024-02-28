import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import { MyNavLink } from '../UI/MyNavLink';
import { setScrollState } from '../../helpers/pageHelper';

export const Navbar = () => {
  const { search } = useLocation();

  return (
    <nav className="navbar">
      <Link
        to={{ hash: 'side-menu', search }}
        className="navbar__mobile"
        onClick={() => setScrollState('hidden')}
      />

      <div className="navbar__main">
        <MyNavLink pathname="/"> Home </MyNavLink>
        <MyNavLink pathname="/phones"> Phones </MyNavLink>
        <MyNavLink pathname="/tablets"> Tablets </MyNavLink>
        <MyNavLink pathname="/accessories"> Accessories </MyNavLink>
      </div>
    </nav>
  );
};
