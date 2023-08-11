import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App = () => (
  <div className="page">
    <Header />

    <Outlet />

    <Footer />
  </div>
);

export default App;
