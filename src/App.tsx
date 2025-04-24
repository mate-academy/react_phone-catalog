import './App.scss';
import { ComponentHeader } from './components/Header';
import { ComponentFooter } from './components/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <ComponentHeader />
    <main>
      <Outlet />
    </main>
    <ComponentFooter />
  </div>
);
