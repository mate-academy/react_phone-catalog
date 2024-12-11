import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, HeaderOrigin } from './components/PageTopComponents/Header';
import { Menu } from './components/PageTopComponents/Menu';

export const App = () => (
  <div className="App">
    <Header origin={HeaderOrigin.ONPAGE} />
    <Menu />
    <div className="outlet-container">
      <Outlet />
    </div>
    <h1 style={{ borderTop: '5px solid grey' }}>FOOTER</h1>
  </div>
);
