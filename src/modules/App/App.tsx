import './App.scss';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="App__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
