import { Link } from 'react-router-dom';
import './style.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <Link className="menu__link" to="/home">home</Link>
      <Link className="menu__link" to="/phones">phones</Link>
      <Link className="menu__link" to="/tablets">tablets</Link>
      <Link className="menu__link" to="/accessoiries">accessories</Link>
      <Link className="menu__link" to="/favorits">favorite</Link>
      <Link className="menu__link" to="/basket">basket</Link>
    </div>
  );
};
