// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

export const App = () => (
  <div className="App">
    <Header />

    <main>
      <Outlet />
    </main>

    <footer>
      Footer
    </footer>
  </div>
);
