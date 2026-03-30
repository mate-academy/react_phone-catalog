import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
