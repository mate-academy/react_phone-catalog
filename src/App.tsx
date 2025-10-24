import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="flex flex-col min-w-[320px] min-h-[100dvh]">
      <Header />
      <Menu />
      <main className="flex shrink-0 grow flex-col pt-[48px] pb-[56px] sm:pb-[64px] xl:pt-[64px] xl:pb-[80px]">
        <div className="container flex shrink-0 grow flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
