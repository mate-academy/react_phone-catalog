import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tablets">Phones</Link>
      <Link to="/tablets">Tablets</Link>
      <Link to="/accessories">Accessories</Link>
    </nav>
  );
};

export default NavBar;
