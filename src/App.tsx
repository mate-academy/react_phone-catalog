import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App dark">
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
