import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <div className={''}>
      <Header />

      <div className="container" style={{ minHeight: '80vh' }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
