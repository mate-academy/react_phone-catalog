import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MobileMenu.scss';

export const MobileMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // Проверка пути для открытия меню
    setIsOpen(location.pathname === '/menu');
    setFooterVisible(location.pathname === '/menu'); // Показывать футер только на /menu
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    setFooterVisible(false); // Скрыть футер при закрытии меню
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <header className="menu">
        <a href="#">
          <div className="menu__logo"></div>
        </a>
        <a onClick={handleClose}>
          <div className="menu__close"></div>
        </a>
      </header>
      <main className="choice">
        <ul className="choice__list">
          <li className="choice__item">
            <Link to="/" className="choice__href">
              home
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/phones" className="choice__href">
              phones
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/tablets" className="choice__href">
              tablets
            </Link>
          </li>
          <li className="choice__item">
            <Link to="/accessories" className="choice__href">
              accessories
            </Link>
          </li>
        </ul>
      </main>
      <footer className={`control ${isFooterVisible ? 'visible' : ''}`}>
        <Link to="/favourites" className="control__href">
          <div className="control__like"></div>
        </Link>
        <Link to="/cart" className="control__href">
          <div className="control__backpack"></div>
        </Link>
      </footer>
    </div>
  );
};
