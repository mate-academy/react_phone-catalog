import { Outlet } from 'react-router-dom';

import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/HeaderPage/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
