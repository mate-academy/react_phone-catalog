import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header';

import '@/styles/main.scss';

export const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};
