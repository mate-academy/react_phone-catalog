import { Outlet } from 'react-router-dom';

import './App.scss';
import { Logo } from './components/Logo';

const App = () => (
  <>
    <header>
      <Logo />
    </header>

    <main>
      <Outlet />
    </main>

    <footer>
      <h2>footer</h2>
    </footer>
  </>
);

export default App;
