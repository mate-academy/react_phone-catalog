import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavButtons.scss';

export const NavButtons = () => {
  const [theme, toggleTheme] = useState('light');

  return (
    <div className="nav__buttons">
      <button
        onClick={() => toggleTheme('dark')}
        className={`toggler ${theme}`}
      ></button>
      <Link
        to={{
          pathname: '/favourites',
        }}
        // state={{ from: location.pathname }}
        className="nav__button"
      >
        <div className="icon icon--favourite">
          <div className="counter">{1}</div>
        </div>
      </Link>
      <Link
        to={{
          pathname: '/cart',
        }}
        // state={{ from: location.pathname }}
        className="nav__button"
      >
        <div className="icon icon--cart">
          <div className="counter">{1}</div>
        </div>
      </Link>

      <button className="nav__button icon icon--menu" onClick={() => {}} />
    </div>
  );
};
