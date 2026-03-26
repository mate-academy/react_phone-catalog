import './BurgerMenu.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import BurgerFooter from './BurgerFooter/BurgerFooter';
import { Link } from 'react-router-dom';

type BurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  return (
    <aside className={`menu page__menu ${isOpen ? 'active' : ''}`} id="menu">
      <div className="top-bar">
        <Link to="/" className="top-bar__logo">
          <img src={Logo} alt="NiceGadgets logo" />
        </Link>
        <button
          onClick={onClose}
          className="top-bar__icon icon--close"
        ></button>
      </div>
      <div className="menu__content">
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/" className="menu__link">
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/phones" className="menu__link">
              Phones
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/tablets" className="menu__link">
              Tablets
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/accessories" className="menu__link">
              Accessories
            </Link>
          </li>
        </ul>
      </div>
      <BurgerFooter />
    </aside>
  );
};

export default BurgerMenu;
