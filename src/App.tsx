import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="flex flex-col min-w-[320px] min-h-dvh">
      <Header />
      <Menu />
      <main className="flex shrink-0 grow flex-col pt-12 pb-14 sm:pb-16 xl:pt-16 xl:pb-20">
        <div className="container flex shrink-0 grow flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
