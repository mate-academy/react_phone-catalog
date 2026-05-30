import React from 'react';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { MenuProvider } from '../../context/MenuProvider';

export const HeaderRegion: React.FC = () => {
  return (
    <MenuProvider>
      <Header />
      <Menu />
    </MenuProvider>
  );
};
