import { Link } from 'react-router-dom';
import './Aside.scss';

export const Aside = () => {
  return (
    <aside className="menu" id="menu">
      <div className="menu__top">
        <a href="#" className="menu__logo">
          <img src="/figmaLogo/Logo.svg" alt="NiceGadgets_logo" />
        </a>
        <div className="menu__close">
          <a href="#" className="menu__closes"></a>
        </div>
      </div>
      <div className="menu__content">
        <nav className="menu__nav">
          <Link to="/">
            <div className="nav__link--phone">HOME</div>
          </Link>
          <Link to="/phones">
            <div className="nav__link--phone">PHONES</div>
          </Link>
          <Link to="/tablets">
            <div className="nav__link--phone">TABLETS</div>
          </Link>
          <Link to="/accessories">
            <div className="nav__link--phone">ACCESSORIES</div>
          </Link>
        </nav>
      </div>
      <div className="menu__bottom">
        <div className="menu__heart">
          <a href="#" className="menu__heart__top"></a>
        </div>
        <div className="menu__packet">
          <a href="#" className="menu__packet__top"></a>
        </div>
      </div>
    </aside>
  );
};
