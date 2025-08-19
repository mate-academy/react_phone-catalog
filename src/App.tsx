import './App.scss';
import './styles/_fonts.scss';
import { Header } from './components/Header/Header';
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
