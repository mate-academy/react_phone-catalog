import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import './Buttons.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ContextProviders } from './components/ContextProviders';

export const App: FC = () => {
  return (
    <ContextProviders>
      <Header />

      <div className="main">
        <Outlet />
      </div>

      <Footer />
    </ContextProviders>
  );
};
