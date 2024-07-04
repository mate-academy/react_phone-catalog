import { HeaderMenuButtons } from '../blocks/HeaderMenuButtons';
import { HeaderButtons } from '../blocks/HeaderButtons';
import logo from '../../img/logo.png';
import { useContext } from 'react';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

export const Header = () => {
  const { isActiveMenu } = useContext(IsActiveMenuContext);

  return (
    <header className="header" id="header">
      <img src={logo} alt="logo" className="header__logo" />
      {isActiveMenu ? <HeaderMenuButtons /> : <HeaderButtons />}
    </header>
  );
};
