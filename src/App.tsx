import { Outlet } from 'react-router-dom';
import './App.scss';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

const App = () => {
  return (
    <div className="App container">
      <Header />

      <div className="container container--main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default App;
