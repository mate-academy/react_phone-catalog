import './styles/main.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />

    <Outlet />

    <div style={{ color: 'black' }}> lorem1000</div>
    <div style={{ color: 'black' }}> lorem1000</div>
    <div style={{ color: 'black' }}> lorem1000</div>
    <div style={{ color: 'black' }}> lorem1000</div>

    <Footer />
  </div>
);
