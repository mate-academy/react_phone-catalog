import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '@shared/components/Header';
import { Footer } from '@shared/components/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <main className="App__main">
      <Outlet />
    </main>

    <Footer />
  </div>
);
