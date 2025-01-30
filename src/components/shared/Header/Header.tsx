import './Header.module.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="logo header__logo"></div>
      <nav className="nav header__nav"></nav>
      <div className="header__choice">
        <div className="header__choice--favorite"></div>
        <div className="header__choice--shopping-cart"></div>
      </div>
    </div>
  )
};
