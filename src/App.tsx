import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { SavedItemsProvoder } from './store/SavedProductsContext';

export const App = () => (
  <div className="App">
    <SavedItemsProvoder>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </SavedItemsProvoder>
  </div>
);
