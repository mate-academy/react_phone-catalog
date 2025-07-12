import './App.scss';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/Footer';

export const App = () => (
  <div className="App">
    <Header className={'App__header'} />
    <Outlet />
    <Footer className={'App__footer'} />
  </div>
);
