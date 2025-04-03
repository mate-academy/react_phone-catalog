import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="">
          <a href="#" className="header__logo">
            <img src="/figmaLogo/Logo.svg" alt="NiceGadgets_logo" />
          </a>
        </div>
        <div className="header__nav">
          <div className="nav__link">
            <h4>HOME</h4>
          </div>
          <div className="nav__link">
            <h4>PHONES</h4>
          </div>
          <div className="nav__link">
            <h4>TABLETS</h4>
          </div>
          <div className="nav__link">
            <h4>ACCESSORIES</h4>
          </div>
        </div>
        <div>
          <a href="#menu" className="header__burger-menu"></a>
        </div>

        <div className="header__head--logo">
          <div className="header__heart">
            <a href="#" className="header__heart__top"></a>
          </div>
          <div className="header__packet">
            <a href="#" className="header__packet__top"></a>
          </div>
        </div>
      </div>
    </header>
  );
};
