import { Outlet } from 'react-router-dom';
import '../src/App.scss';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => (
  <div className="App">
    <Header />
    <Outlet />
    <Footer />
  </div>
);
