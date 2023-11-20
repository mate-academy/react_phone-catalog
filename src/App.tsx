import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App = () => (
  <>
    <Header />

    <main>
      <div className="Container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </>
);

export default App;
