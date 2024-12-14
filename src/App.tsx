import { Outlet } from 'react-router-dom';
import '../src/styles/main.scss';
import './App.scss';
import { Footer } from './modules/shared/Footer';
import { Header } from './modules/shared/Header';

export const App = () => (
  <div className="App">
    <h1 className="App__title-hidden">Product Catalog</h1>

    <header className="App__header">
      <Header />
    </header>

    <main className="App__content">
      <Outlet />
    </main>

    <footer className="App__footer">
      <Footer />
    </footer>
  </div>
);
