import './styles/main.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
