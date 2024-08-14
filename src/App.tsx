import { Header } from './componentsApp/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './componentsApp/Footer/Footer';

import './App.scss';
import './Outlet.scss';

export const App = () => (
  <div className="App">
    <body>
      <Header />

      <Outlet />

      <Footer />
    </body>
  </div>
);
