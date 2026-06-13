import { Link } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

export const Menu = ({ onClose }: Props) => {
  return (
    <div>
      <Link to="/">
        <img src="/img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>
      <button type="button" onClick={onClose}>
        <img src="/img/close_menu/close_menu.png" alt="Close Menu" />
      </button>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/phones">Phones</Link>
          </li>
          <li>
            <Link to="/tablets">Tablets</Link>
          </li>
          <li>
            <Link to="/accessories">Accessories</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Link to="/favourites">
          <img src="/img/icons/favourites_icon.png" alt="Favourites icon" />
        </Link>
        <Link to="/cart">
          <img src="/img/icons/cart_icon.png" alt="Cart icon" />
        </Link>
      </div>
    </div>
  );
};
