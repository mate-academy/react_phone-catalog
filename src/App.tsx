import { Outlet } from 'react-router-dom';

import './App.scss';

const App = () => (
  <>
    <header>
      <h1>header</h1>
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
