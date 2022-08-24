import { Link } from 'react-router-dom';
import './Menu.scss';

export const Menu: React.FC = () => {
  return (
    <nav className="Menu">
      <ul className="Menu__ul">
        <li className="Menu__li">
          <Link to="/" className="Menu__link">
            <h1 className="Menu__text">Home</h1>
          </Link>
        </li>
        <li className="Menu__li">
          <Link to="/phones" className="Menu__link">
            <h1 className="Menu__text">Phones</h1>
          </Link>
        </li>
        <li className="NavBar__li">
          <Link to="/tablets" className="Menu__link">
            <h1 className="Menu__text">Tablets</h1>
          </Link>
        </li>
        <li className="NavBar__li">
          <Link to="/accessories" className="Menu__link">
            <h1 className="Menu__text">ACCESSORIES</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
