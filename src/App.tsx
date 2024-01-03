import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';

const App = () => (
  <div className="page__app" id="app">
    <Header />

    <Menu />

    <main className="page__main main">
      <Outlet />
    </main>

    <Footer />
  </div>
);

export default App;
