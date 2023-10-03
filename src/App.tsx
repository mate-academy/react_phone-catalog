import './App.scss';
import { Outlet } from 'react-router-dom';
import { ShopProvider } from './ShopProvider';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

const App = () => (
  <ShopProvider>
    <div className="app">
      <Header />
      <main className="app__page">
        <div className="page__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  </ShopProvider>
);

export default App;
