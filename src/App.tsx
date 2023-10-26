import './App.scss';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';

const App = () => (
  <div className="page">
    <Header />

    <div className="page__content">
      <Outlet />
    </div>

    <Footer />
  </div>
);

export default App;
