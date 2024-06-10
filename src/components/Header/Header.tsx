import { Route, Routes } from 'react-router-dom';
import { HeaderMenuButtons } from '../blocks/HeaderMenuButtons';
import { HeaderButtons } from '../blocks/HeaderButtons';
import logo from '../../img/logo.png';

export const Header = () => {
  return (
    <header className="header" id="header">
      <img src={logo} alt="logo" className="header__logo" />
      <Routes>
        <Route path="/menu" element={<HeaderMenuButtons />} />
        <Route path="*" element={<HeaderButtons />} />
      </Routes>
    </header>
  );
};
