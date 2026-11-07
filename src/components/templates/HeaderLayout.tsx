import type React from 'react';
import { Header } from '../organisms/Header/Header';
import { Footer } from '../organisms/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const HeaderLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-primary text-primary dark:text-white transition-colors">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
