import './utils/_fonts.scss';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// import { ProductCard } from './components/ProductCard';
// import product from '../public/api/products.json';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export const App = () => {

  return (
    <HashRouter>
    <div className="app">

      <Header />
      <main className="main-content">
      <AppRouter />
      </main>
      <Footer />

    </div>
    </HashRouter>
  )
};
