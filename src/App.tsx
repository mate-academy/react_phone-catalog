import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <main>
      <div>
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
