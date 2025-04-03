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
          <a href="#" className="nav__link--phone">
            HOME
          </a>
          <a href="#" className="nav__link--phone">
            PHONES
          </a>
          <a href="#" className="nav__link--phone">
            TABLETS
          </a>
          <a href="#" className="nav__link--phone">
            ACCESSORIES
          </a>
        </nav>
      </div>
      <div className="menu__footer">
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
