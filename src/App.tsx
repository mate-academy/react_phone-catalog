import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import ScrollToTop from './modules/shared/components/ScrollToTop';

export const App = () => (
  <>
    <ScrollToTop />
    <div className="App">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
);
