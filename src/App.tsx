import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import './fonts/Mont-Regular.otf';
import './fonts/Mont-Bold.otf';
import './fonts/Mont-SemiBold.otf';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <main className="main-content">
      <div className="main-content__container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
