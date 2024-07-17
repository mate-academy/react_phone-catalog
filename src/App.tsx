import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <Outlet />
    </div>
  </div>
);
