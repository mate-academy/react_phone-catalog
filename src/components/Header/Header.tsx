import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo.svg" alt="Logo" className="header__logo" />

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li
              className="header__nav-item text-button 
                         header__nav-item--selected"
            >
              Home
            </li>
            <li className="header__nav-item text-button">Phones</li>
            <li className="header__nav-item text-button">Tablets</li>
            <li className="header__nav-item text-button">Accessories</li>
          </ul>
        </nav>
      </div>

      <div className="header__buttons">
        <div className="header__button">
          <img src="/icons/favourite.svg" alt="Favourite icon" />
        </div>

        <div className="header__button">
          <img src="/icons/cart.svg" alt="Cart icon" />
        </div>
      </div>
    </header>
  );
};
