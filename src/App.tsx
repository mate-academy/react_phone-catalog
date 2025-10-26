import { Outlet } from 'react-router-dom';
import './styles/main.scss';

import { Header, Menu, Footer } from './modules/shared';

export const App = () => {

  return (
    <div className="App">
      {/* <h1>Product Catalog</h1> */}
      <Header />

      <Menu />

      <main className="main page__main">

        <Outlet />

      </main>

      <Footer />
    </div>
  );
}