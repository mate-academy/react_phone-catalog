import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="page">
        <Breadcrumbs />
        <div className="page__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
