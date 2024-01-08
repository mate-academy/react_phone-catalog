import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.scss';

const App = () => (
  <>
    <Header />

    <main className="Page-Main">
      <div className="Container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </>
);

export default App;
