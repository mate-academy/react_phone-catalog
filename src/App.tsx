import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);
