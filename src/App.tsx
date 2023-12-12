import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Header/NavBar';
import { Footer } from './components/Footer';

const App = () => (
  <div className="App">
    <NavBar />
    <main className="main">
      <div className="main__container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default App;
