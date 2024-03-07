import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import './App.scss';
import { Header } from './pages/Header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
