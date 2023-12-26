import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const App = () => (
  <div className="page__app" id="app">
    <Header />

    <main className="page__main main">
      <Outlet />
    </main>

    <Footer />
  </div>
);

export default App;
