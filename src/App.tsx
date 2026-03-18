import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { Main } from './components/Main';

export const App = () => (
  <div className="App">
    <Header />
    <SideMenu />
    <Main>
      <Outlet />
    </Main>
  </div>
);
