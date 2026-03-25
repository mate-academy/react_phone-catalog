import './BurgerMenu.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import BurgerFooter from './BurgerFooter/BurgerFooter';

type BurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  return (
    <aside className={`menu page__menu ${isOpen ? 'active' : ''}`} id="menu">
      <div className="top-bar">
        <a href="#homePage" className="top-bar__logo">
          <img src={Logo} alt="NiceGadgets logo" />
        </a>
        <button
          onClick={onClose}
          className="top-bar__icon icon--close"
        ></button>
      </div>
      <div className="menu__content">
        <ul className="menu__list">
          <li className="menu__item">
            <a href="#" className="menu__link">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Phones
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Tablets
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Accessories
            </a>
          </li>
        </ul>
      </div>
      <BurgerFooter />
    </aside>
  );
};

export default BurgerMenu;
