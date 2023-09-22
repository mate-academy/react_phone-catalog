import '../../styles/components/Header/Header.scss';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/icons/logo.svg';
import { NavBarItem } from '../NavBarItem';
import { Input } from '../Input';
import { getLastWord } from '../../utils/routerService';

type Props = {
  cartLengh: number,
  favLengh: number,
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const Header: React.FC<Props> = ({
  cartLengh,
  favLengh,
  value,
  onChange,
  onClear,
}) => {
  const location = useLocation();

  const locationPosition = getLastWord(location.pathname);

  return (
    <header className="header">
      <nav className="header__navigation nav">
        <Link to="/" className="logo__link">
          <img
            src={logo}
            alt="logo"
            className="nav__logo"
          />
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <NavBarItem
              to="/"
              type="text"
              className="nav__link"
            >
              Home
            </NavBarItem>
          </li>
          <li className="nav__item">
            <NavBarItem
              to="phones"
              type="text"
              className="nav__link"
            >
              Phones
            </NavBarItem>
          </li>
          <li className="nav__item">
            <NavBarItem
              to="tablets"
              type="text"
              className="nav__link"
            >
              Tablets
            </NavBarItem>
          </li>
          <li className="nav__item">
            <NavBarItem
              to="accessories"
              type="text"
              className="nav__link"
            >
              Accessories
            </NavBarItem>
          </li>
        </ul>
      </nav>

      <div className="header__actions">
        {(locationPosition === 'phones'
          || locationPosition === 'tablets'
          || locationPosition === 'accessories'
          || locationPosition === 'favourites') && (
          <Input
            position={locationPosition}
            value={value}
            onChange={onChange}
            onClear={onClear}
          />
        )}

        <NavBarItem to="favourites" type="fav" favLengh={favLengh} />

        <NavBarItem to="cart" type="cart" cartLengh={cartLengh} />
      </div>
    </header>
  );
};
