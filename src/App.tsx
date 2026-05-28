import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header/Header';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
