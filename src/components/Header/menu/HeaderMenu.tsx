import './HeaderMenu.scss';
import Logo from '../../../../public/img/Logo/Logo.png';

const HeaderMenu: React.FC = () => {
  return (
    <aside className="menu page__menu">
      <div className="top-bar menu__top">
        <a href="#" className="top-bar__logo">
          <img src={Logo} alt="NiceGadgets logo" />
        </a>
      </div>

      <div className="menu__content">
        <nav className="nav menu__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="" className="nav__link">
                GITHUB
              </a>
            </li>
            <li className="nav__item">
              <a href="" className="nav__link">
                CONTACTS
              </a>
            </li>
            <li className="nav__item">
              <a href="" className="nav__link">
                RIGHTS
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default HeaderMenu;
