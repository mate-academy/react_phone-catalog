import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Notification } from './components/Notification';

export const App = () => (
  <div className="App">
    <h1 className="App-title">Product Catalog</h1>
    <Header />

    <main className="container">
      <Outlet />
      <Notification />
    </main>

    <Footer />
  </div>
);
