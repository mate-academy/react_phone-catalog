export const Menu: React.FC = () => {
  return (
    <nav className="nav menu__nav">
      <ul className="nav__list">
        <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="#phones" className="nav__link">
            Phones
          </a>
        </li>
        <li className="nav__item">
          <a href="#tablets" className="nav__link">
            tablets
          </a>
        </li>
        <li className="nav__item">
          <a href="#accessories" className="nav__link">
            accessories
          </a>
        </li>
      </ul>
    </nav>
  );
};
