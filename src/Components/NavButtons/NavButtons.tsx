import './NavButtons.scss';

export const NavButtons = () => {
  return (
    <div className="nav-buttons">
      <a
        href="/favorites"
        className="nav-buttons__element"
      >
        <img
          src="./img/icons/Favourites (Heart Like).png"
          alt="favorities icon"
          className="nav-buttons__icon"
        />
      </a>
      <a
        href="/cart"
        className="nav-buttons__element"
      >
        <img
          src="./img/icons/Shopping bag (Cart).png"
          alt="favorities icon"
          className="nav-buttons__icon"
        />
      </a>
    </div>
  );
};
