import './Layout.scss';
import { Header } from '../widgets/Header';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);
