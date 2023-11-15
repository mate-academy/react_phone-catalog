import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';

const App = () => (
  <>
    <Header />

    <main>
      <Outlet />
    </main>

    <footer>
      <h2>footer</h2>
    </footer>
  </>
);

export default App;
