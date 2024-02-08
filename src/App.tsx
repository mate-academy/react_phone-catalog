import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';

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
