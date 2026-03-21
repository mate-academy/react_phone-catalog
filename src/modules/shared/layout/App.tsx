import { Outlet } from 'react-router-dom';
import { MenuProvider } from '../providers/MenuProvider';
import { Header } from './Header/components/Header';
import { Menu } from './Menu/components/Menu';
import { Footer } from './Footer/components/Footer';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="dark:bg-d-black flex min-h-dvh min-w-[320px] flex-col bg-white">
      <MenuProvider>
        <Header className="fixed top-0 right-0 left-0 z-1 h-(--header-height-xs) w-full xl:h-(--header-height-xl)" />
        <Menu className="fixed top-0 right-0 bottom-0 left-0 z-2 h-full w-full lg:hidden" />
      </MenuProvider>
      <main className="flex flex-[1_0_100%] flex-col pt-(--header-height-xs) pb-14 sm:pb-16 xl:pt-(--header-height-xl) xl:pb-20">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
