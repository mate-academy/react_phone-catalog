import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="">
          <a href="#" className="header__logo">
            <img src="../public/figmaLogo/Logo.svg" alt="NiceGadgets_logo" />
          </a>
        </div>
        <div>
          <a href="#menu" className="header__burger-menu"></a>
        </div>
      </div>
    </header>
  );
};
