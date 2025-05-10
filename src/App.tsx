import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <>
    <Header />
    <main className="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
);
