import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Navbar } from './components/NavBar';

const App = () => (
  <div className="app">
    <Navbar />

    <Outlet />

    <Footer />
  </div>
);

export default App;
