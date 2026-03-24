import './BurgerMenu.scss';
import Logo from '../../../public/img/Logo/Logo.png';

type BurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
  return (
    <aside className={`menu page__menu ${isOpen ? 'active' : ''}`} id="menu">
      <div className="top-bar menu__top">
        <a href="#homePage" className="top-bar__logo">
          <img src={Logo} alt="NiceGadgets logo" />
        </a>
        <button
          onClick={onClose}
          className="top-bar__icon icon--close"
        ></button>
      </div>
    </aside>
  );
};

export default BurgerMenu;
