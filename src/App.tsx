import { Outlet, useLocation } from 'react-router-dom';
import '../src/App.scss';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Outlet />
      {location.pathname !== '/menu' && <Footer />}
    </div>
  );
};
