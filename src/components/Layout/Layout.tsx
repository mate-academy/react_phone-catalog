import React, { useState } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { Menu } from '../Menu';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <>
      <Header onMenu={setIsMenu} />
      <Menu isOpen={isMenu} onClose={() => setIsMenu(false)} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
