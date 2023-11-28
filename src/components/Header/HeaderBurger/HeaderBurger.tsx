/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext } from 'react';
import { MainContext } from '../../../context/MainContext';

export const HeaderBurger = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MainContext);

  return (
    <div
      className="header__icon header__burgers"
      onMouseDown={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div className="header__burger">
        <span />
      </div>
    </div>
  );
};
