import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
