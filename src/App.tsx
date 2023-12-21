import './App.scss';

import {
  Outlet,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <div className="flex-app">
        <div className="flex-app__headerMain">
          <Header />

          <main>
            <Outlet />
          </main>
        </div>

        <div className="flex-app__footer">
          <div className="separator" />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
