import './NavBar.scss';

export const NavBar = () => (
  <nav className="nav">
    <div className="nav__right">
      <img className="nav__logo" src="logo/logo.svg" alt="logo" />
      <div className="nav__links">
        <a className="nav__link" href="#">
          HOME
        </a>
        <a className="nav__link" href="#">
          PHONE
        </a>
        <a className="nav__link" href="#">
          TABLETS
        </a>
        <a className="nav__link" href="#">
          ACCESSORIES
        </a>
      </div>
    </div>
    <div className="nav__burger-block">
      <img className="nav__burger" src="icons/burger.svg" alt="burger_icon" />
    </div>
    <div className="nav__icons">
      <div className="nav__like-block">
        <img className="nav__like" src="icons/like.svg" alt="like_icon" />
      </div>
      <div className="nav__shop-block">
        <img className="nav__shop" src="icons/shop.svg" alt="shop_icon" />
      </div>
    </div>
  </nav>
);
