/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext } from 'react';
import { MainContext } from '../../../context/MainContext';

export const HeaderLayer = () => {
  const { setIsMenuOpen } = useContext(MainContext);

  return (
    <div className="header__layer" onMouseDown={() => setIsMenuOpen(false)} />
  );
};
