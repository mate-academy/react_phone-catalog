import { Route, Routes } from 'react-router-dom';
import { MainFooter } from '../blocks/MainFooter';
import { MenuFooter } from '../blocks/MenuFooter';

export const Footer = () => {
  return (
    <Routes>
      <Route path="/menu" element={<MenuFooter />} />
      <Route path="*" element={<MainFooter />} />
    </Routes>
  );
};
