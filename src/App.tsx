import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <main>
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

export default App;
