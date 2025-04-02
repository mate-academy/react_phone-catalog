import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="page">
        <div className="page__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
