import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />

    <main>
      <Outlet />
    </main>

    {/* Footer */}
  </div>
);
