import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

const App = () => (
  <div className="App">
    <Header />

    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);

export default App;
