import { Outlet } from 'react-router-dom';

import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App = () => (
  <div className="app">
    <Header />

    <Outlet />

    <Footer />
  </div>
);

export default App;
