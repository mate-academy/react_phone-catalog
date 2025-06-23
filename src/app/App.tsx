import './Layout.scss';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const App = () => (
  <div className="App">
    <Header className={'App__header'} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
