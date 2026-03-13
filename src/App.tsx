import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';

export const App = () => (
  <div className="App">
    <Header />
    <SideMenu />
    <main>
      <Outlet />
    </main>
  </div>
);
